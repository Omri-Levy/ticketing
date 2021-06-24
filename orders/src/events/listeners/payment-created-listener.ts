import {
  Listener,
  NotFoundError,
  OrderStatus,
  PaymentCreatedEvent,
  Subjects,
} from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/Order';
import queueGroupName from './queue-group-name';

class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PAYMENT_CREATED;

  queueGroupName = queueGroupName;

  /* eslint quotes: "off" */
  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new NotFoundError(`Order`);
    }

    order.set({ status: OrderStatus.COMPLETE });

    await order.save();

    msg.ack();
  }
}

export default PaymentCreatedListener;
