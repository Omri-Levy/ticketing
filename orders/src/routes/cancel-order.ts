import { Request, Response, Router } from 'express';
import {
  NotFoundError,
  OrderStatus,
  requireAuth,
  UnauthorizedError,
  validateRequest,
} from '@omrilevyorg/common';
import { param } from 'express-validator';
import mongoose from 'mongoose';
import { Order } from '../models/Order';
import { natsWrapper } from '../nats-wrapper';
import OrderCancelledPublisher from '../events/publishers/order-cancelled-publisher';

const cancelOrder = Router();

cancelOrder.patch(
  `/api/orders/:orderId`,
  requireAuth,
  [
    param(`orderId`)
      .notEmpty()
      .custom((orderId) => mongoose.Types.ObjectId.isValid(orderId))
      .withMessage(`orderId is a required param.`),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate(`ticket`);

    if (!order) {
      throw new NotFoundError(`Order`);
    }

    if (order.userId !== req.currentUser.id) {
      throw new UnauthorizedError();
    }

    order.status = OrderStatus.CANCELLED;

    await order.save();

    const publisher = new OrderCancelledPublisher(natsWrapper.stan);

    publisher.publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    res.status(204).send(order);
  },
);

export default cancelOrder;
