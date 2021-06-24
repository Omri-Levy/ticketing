import { Listener, OrderCreatedEvent, Subjects } from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/Order';
import queueGroupName from './queue-group-name';

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.ORDER_CREATED;

  queueGroupName = queueGroupName;

  /* eslint quotes: "off" */
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      userId: data.userId,
      status: data.status,
      price: data.ticket.price,
      version: data.version,
    });

    await order.save();

    msg.ack();
  }
}

export default OrderCreatedListener;
