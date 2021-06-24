import {
  Listener,
  NotFoundError,
  OrderCreatedEvent,
  Subjects,
} from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import queueGroupName from './queue-group-name';
import Ticket from '../../models/Ticket';
import TicketUpdatedPublisher from '../publishers/ticket-updated-publisher';

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.ORDER_CREATED;

  queueGroupName = queueGroupName;

  /* eslint quotes: "off" */
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // find the ticket the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // if no ticket, throw an error
    if (!ticket) {
      throw new NotFoundError(`Ticket not found`);
    }

    // mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });

    // save the ticket
    await ticket.save();

    // sync version across services
    const publisher = new TicketUpdatedPublisher(this.stan);

    await publisher.publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });

    // ack the message
    msg.ack();
  }
}

export default OrderCreatedListener;
