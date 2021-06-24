import { Request, Response, Router } from "express";
import { NotFoundError } from "@omrilevyorg/common";
import Ticket from "../models/Ticket";

const showTicket = Router();

showTicket.get(`/api/tickets/:id`, async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError(`Ticket`);
  }

  res.send(ticket);
});

export default showTicket;
