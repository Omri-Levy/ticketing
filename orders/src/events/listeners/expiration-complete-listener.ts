import {
  ExpirationCompleteEvent,
  Listener,
  NotFoundError,
  Subjects,
} from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import queueGroupName from './queue-group-name';
import { Order, OrderStatus } from '../../models/Order';
import OrderCancelledPublisher from '../publishers/order-cancelled-publisher';

class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  readonly subject = Subjects.EXPIRATION_COMPLETE;

  queueGroupName = queueGroupName;

  /* eslint quotes: "off" */
  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate(`ticket`);

    if (!order) {
      throw new NotFoundError(`Order`);
    }

    order.set({
      status: OrderStatus.CANCELLED,
    });

    await order.save();

    const publisher = new OrderCancelledPublisher(this.stan);

    await publisher.publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}

export default ExpirationCompleteListener;
