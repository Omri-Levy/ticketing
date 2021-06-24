import Subjects from './subjects';
import TicketCreatedEvent from './ticket-created-event';
import {Publisher} from './base-publisher';

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	readonly subject = Subjects.TICKET_CREATED;
}

export default TicketCreatedPublisher;
