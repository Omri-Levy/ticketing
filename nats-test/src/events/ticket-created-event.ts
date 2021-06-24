import Subjects from './subjects';

interface TicketCreatedEvent {
	subject: Subjects.TICKET_CREATED;
	data: {
		id: string;
		title: string;
		price: number;
	}
};

export default TicketCreatedEvent;
