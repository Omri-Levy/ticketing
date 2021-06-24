import { PaymentCreatedEvent, Publisher, Subjects } from '@omrilevyorg/common';

class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PAYMENT_CREATED;
}

export default PaymentCreatedPublisher;
