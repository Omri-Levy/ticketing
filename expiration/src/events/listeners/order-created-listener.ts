import { Listener, OrderCreatedEvent, Subjects } from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import queueGroupName from './queue-group-name';
import expirationQueue from '../../queues/expiration-queue';

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.ORDER_CREATED;

  queueGroupName = queueGroupName;

  /* eslint quotes: "off" */
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // calculate the difference between expiresAt and the current time
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

    console.log(`Waiting ${delay}ms to process this job.`);

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      },
    );

    // ack the message
    msg.ack();
  }
}

export default OrderCreatedListener;
