import { Publisher, Subjects, TicketUpdatedEvent } from '@omrilevyorg/common';

class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TICKET_UPDATED;
}

export default TicketUpdatedPublisher;
