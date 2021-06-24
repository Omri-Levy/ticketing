import {
  Listener,
  NotFoundError,
  OrderCancelledEvent,
  Subjects,
} from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import queueGroupName from './queue-group-name';
import Ticket from '../../models/Ticket';
import TicketUpdatedPublisher from '../publishers/ticket-updated-publisher';

class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.ORDER_CANCELLED;

  queueGroupName = queueGroupName;

  /* eslint quotes: "off" */
  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    // find the ticket the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // if no ticket, throw an error
    if (!ticket) {
      throw new NotFoundError(`Ticket not found`);
    }

    // mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: undefined });

    // save the ticket
    await ticket.save();

    const publisher = new TicketUpdatedPublisher(this.stan);

    await publisher.publish({
      id: ticket.id,
      orderId: ticket.orderId,
      userId: ticket.userId,
      price: ticket.price,
      title: ticket.title,
      version: ticket.version,
    });

    // ack the message
    msg.ack();
  }
}

export default OrderCancelledListener;
