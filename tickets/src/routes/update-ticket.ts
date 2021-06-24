import { Request, Response, Router } from 'express';
import {
  BadRequestError,
  NotFoundError,
  requireAuth,
  UnauthorizedError,
  validateRequest,
} from '@omrilevyorg/common';
import { body } from 'express-validator';
import Ticket from '../models/Ticket';
import { natsWrapper } from '../nats-wrapper';
import TicketUpdatedPublisher from '../events/publishers/ticket-updated-publisher';

const updateTicket = Router();

updateTicket.patch(
  `/api/tickets/:id`,
  requireAuth,
  [
    body(`title`).notEmpty().withMessage(`Title is a required field.`),
    body(`price`)
      .isFloat({ gt: 0 })
      .withMessage(`Price must be greater than 0.`),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError(`Ticket`);
    }

    if (ticket.userId !== req.currentUser.id) {
      throw new UnauthorizedError();
    }

    if (ticket.orderId) {
      throw new BadRequestError(`Cannot edit a reserved ticket.`);
    }

    const { title, price } = req.body;

    ticket.set({ title, price });

    await ticket.save();

    const publisher = new TicketUpdatedPublisher(natsWrapper.stan);

    publisher.publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.send(ticket);
  },
);

export default updateTicket;
