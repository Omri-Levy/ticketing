import { OrderCreatedEvent, OrderStatus } from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../nats-wrapper';
import genFakeMongoId from '../../../routes/__test__/utils/functions/genFakeMongoId';
import OrderCreatedListener from '../order-created-listener';
import { Order } from '../../../models/Order';

const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.stan);

  // create a fake data object
  /* eslint quotes: "off" */
  const data: OrderCreatedEvent['data'] = {
    id: genFakeMongoId(),
    userId: genFakeMongoId(),
    version: 0,
    status: OrderStatus.CREATED,
    expiresAt: `test expiration`,
    ticket: {
      id: `test-ticket-id`,
      price: 20,
    },
  };

  // create a fake message object
  // ts ignore due to just mocking the required methods for the tests
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

describe(`order created listener`, () => {
  it(`replicates the order info`, async () => {
    const { listener, data, msg } = await setup();

    // call the onMessage function with the data object and the message
    // object
    await listener.onMessage(data, msg);

    const replicatedOrder = await Order.findById(data.id);

    expect(replicatedOrder?.id).toBe(data.id);
    expect(replicatedOrder?.userId).toBe(data.userId);
    expect(replicatedOrder?.status).toBe(data.status);
    expect(replicatedOrder?.price).toBe(data.ticket.price);
    expect(replicatedOrder?.version).toBe(data.version);
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
