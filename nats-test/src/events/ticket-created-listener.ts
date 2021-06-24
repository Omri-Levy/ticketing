import {Message} from 'node-nats-streaming';
import {Listener} from './base-listener';
import Subjects from './subjects';
import TicketCreatedEvent from './ticket-created-event';

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
	readonly subject = Subjects.TICKET_CREATED;
	queueGroupName = `payments-service`;

	onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
		console.log(`Event data:`);
		console.dir(data, {depth: Infinity});

		msg.ack();
	}

}

export default TicketCreatedListener;
