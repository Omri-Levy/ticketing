import { ExpirationCompleteEvent, Subjects } from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../nats-wrapper';
import genFakeMongoId from '../../../routes/__test__/utils/functions/genFakeMongoId';
import { Ticket } from '../../../models/Ticket';
import { Order, OrderStatus } from '../../../models/Order';
import ExpirationCompleteListener from '../expiration-complete-listener';

const setup = async () => {
  // create an instance of the listener
  const listener = new ExpirationCompleteListener(natsWrapper.stan);

  // create and save a ticket
  const ticket = Ticket.build({
    id: genFakeMongoId(),
    title: `test title`,
    price: 20,
  });

  await ticket.save();

  const order = Order.build({
    status: OrderStatus.CREATED,
    userId: genFakeMongoId(),
    expiresAt: new Date(),
    ticket,
  });

  await order.save();

  // create a fake data object
  /* eslint quotes: "off" */
  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id,
  };

  // create a fake message object
  // ts ignore due to just mocking the required methods for the tests
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, ticket, order };
};

describe(`expiration complete listener`, () => {
  it(`updates the order status to cancelled`, async () => {
    const { listener, data, msg, order } = await setup();

    // call the onMessage function with the data object and the message
    // object
    await listener.onMessage(data, msg);

    // write assertions to make sure the order was cancelled
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

  it(`publishes an order cancelled event`, async () => {
    const { listener, data, msg, order } = await setup();

    // call the onMessage function with the data object and the message
    // object
    await listener.onMessage(data, msg);

    expect(natsWrapper.stan.publish).toHaveBeenCalled();
    expect((natsWrapper.stan.publish as jest.Mock).mock.calls[0][0]).toBe(
      Subjects.ORDER_CANCELLED,
    );

    const eventData = JSON.parse(
      (natsWrapper.stan.publish as jest.Mock).mock.calls[0][1],
    );

    expect(eventData.id).toBe(order.id);
  });
});
