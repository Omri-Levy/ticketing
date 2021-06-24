import { Publisher, Subjects, TicketCreatedEvent } from "@omrilevyorg/common";

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TICKET_CREATED;
}

export default TicketCreatedPublisher;
