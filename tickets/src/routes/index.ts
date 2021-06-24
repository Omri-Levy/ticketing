import { Request, Response, Router } from 'express';
import { NotFoundError } from '@omrilevyorg/common';
import Ticket from '../models/Ticket';

const index = Router();

index.get(`/api/tickets`, async (req: Request, res: Response) => {
  const tickets = await Ticket.find({
    orderId: undefined,
  });

  if (!tickets) {
    throw new NotFoundError(`Tickets`);
  }

  res.send(tickets);
});

export default index;
