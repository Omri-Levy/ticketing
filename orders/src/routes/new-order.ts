import { Request, Response, Router } from 'express';
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from '@omrilevyorg/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Order } from '../models/Order';
import OrderCreatedPublisher from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { Ticket } from '../models/Ticket';

const newOrder = Router();
// expires order in 15 minutes
const EXPIRATION_WINDOW_SECONDS = 15 * 60;

newOrder.post(
  `/api/orders`,
  requireAuth,
  [
    body(`ticketId`)
      .notEmpty()
      .custom((id: string) => mongoose.Types.ObjectId.isValid(id))
      .withMessage(`ticketId is a required field.`),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // find the ticket the user is trying to order in the database
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError(`Ticket`);
    }

    // make sure that this ticket is not already reserved
    const existingOrder = await ticket.isReserved();

    if (existingOrder) {
      throw new BadRequestError(`Ticket is already reserved.`);
    }

    //  calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // build the order and save it to the database

    // publish an event saying an order was created

    const order = Order.build({
      userId: req.currentUser.id,
      status: OrderStatus.CREATED,
      expiresAt: expiration,
      ticket,
    });

    await order.save();

    const publisher = new OrderCreatedPublisher(natsWrapper.stan);

    publisher.publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });

    res.status(201).send(order);
  },
);

export default newOrder;
