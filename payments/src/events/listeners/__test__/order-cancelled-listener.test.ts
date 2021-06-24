import { OrderCancelledEvent, OrderStatus } from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../nats-wrapper';
import genFakeMongoId from '../../../routes/__test__/utils/functions/genFakeMongoId';
import OrderCancelledListener from '../order-cancelled-listener';
import { Order } from '../../../models/Order';

const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.stan);

  const order = Order.build({
    id: genFakeMongoId(),
    userId: genFakeMongoId(),
    status: OrderStatus.CREATED,
    price: 20,
    version: 0,
  });

  await order.save();

  // create a fake data object
  /* eslint quotes: "off" */
  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: order.version + 1,
    ticket: {
      id: `test-ticket-id`,
    },
  };

  // create a fake message object
  // ts ignore due to just mocking the required methods for the tests
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order };
};

describe(`order cancelled listener`, () => {
  it(`updates the status of the order`, async () => {
    const { listener, data, msg, order } = await setup();

    // call the onMessage function with the data object and the message
    // object
    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder?.status).toBe(OrderStatus.CANCELLED);
  });

  it(`acks the message`, async () => {
    const { listener, data, msg } = await setup();

    // call the onMessage function with the data object and the message
    // object
    await listener.onMessage(data, msg);

    // write assertions to make sure the ack function was called
    expect(msg.ack).toHaveBeenCalled();
  });
});
