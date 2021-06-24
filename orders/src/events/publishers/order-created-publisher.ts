import { OrderCreatedEvent, Publisher, Subjects } from "@omrilevyorg/common";

class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.ORDER_CREATED;
}

export default OrderCreatedPublisher;
