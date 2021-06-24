import { Request, Response, Router } from 'express';
import { requireAuth, validateRequest } from '@omrilevyorg/common';
import { body } from 'express-validator';
import Ticket from '../models/Ticket';
import TicketCreatedPublisher from '../events/publishers/ticket-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const newTicket = Router();

newTicket.post(
  `/api/tickets`,
  requireAuth,
  [
    body(`title`).notEmpty().withMessage(`Title is a required field.`),
    body(`price`)
      .isFloat({ gt: 0 })
      .withMessage(`Price must be greater than 0.`),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser.id,
    });

    await ticket.save();

    const publisher = new TicketCreatedPublisher(natsWrapper.stan);

    publisher.publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(201).send(ticket);
  },
);

export default newTicket;
