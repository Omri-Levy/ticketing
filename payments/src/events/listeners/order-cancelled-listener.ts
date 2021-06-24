import {
  Listener,
  NotFoundError,
  OrderCancelledEvent,
  Subjects,
} from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import { Order, OrderStatus } from '../../models/Order';
import queueGroupName from './queue-group-name';

class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.ORDER_CANCELLED;

  queueGroupName = queueGroupName;

  /* eslint quotes: "off" */
  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const order = await Order.findByEvent(data);

    if (!order) {
      throw new NotFoundError(`Order`);
    }

    order.set({ status: OrderStatus.CANCELLED });

    await order.save();

    msg.ack();
  }
}

export default OrderCancelledListener;
