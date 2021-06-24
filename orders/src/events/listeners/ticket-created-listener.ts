import { Listener, Subjects, TicketCreatedEvent } from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import queueGroupName from './queue-group-name';
import { Ticket } from '../../models/Ticket';

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TICKET_CREATED;

  queueGroupName = queueGroupName;

  /* eslint quotes: "off" */
  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });

    await ticket.save();

    msg.ack();
  }
}

export default TicketCreatedListener;
