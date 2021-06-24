import { OrderCancelledEvent, Publisher, Subjects } from "@omrilevyorg/common";

class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.ORDER_CANCELLED;
}

export default OrderCancelledPublisher;
