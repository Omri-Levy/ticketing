import {
  Listener,
  NotFoundError,
  Subjects,
  TicketUpdatedEvent,
} from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import queueGroupName from './queue-group-name';
import { Ticket } from '../../models/Ticket';

class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TICKET_UPDATED;

  queueGroupName = queueGroupName;

  /* eslint quotes: "off" */
  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new NotFoundError(`Ticket not found.`);
    }

    const { title, price } = data;

    ticket.set({ title, price });

    await ticket.save();

    msg.ack();
  }
}

export default TicketUpdatedListener;
