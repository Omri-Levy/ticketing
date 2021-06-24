import { OrderCancelledEvent, Subjects } from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import Ticket from '../../../models/Ticket';
import { natsWrapper } from '../../../nats-wrapper';
import genFakeMongoId from '../../../routes/__test__/utils/functions/genFakeMongoId';
import OrderCancelledListener from '../order-cancelled-listener';

const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.stan);
  const orderId = genFakeMongoId();

  // build and save a new ticket
  const ticket = Ticket.build({
    title: `test title`,
    price: 20,
    userId: `test-user-id`,
  });

  ticket.set({ orderId });

  await ticket.save();

  // create a fake data object
  /* eslint quotes: "off" */
  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  // create a fake message object
  // ts ignore due to just mocking the required methods for the tests
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg, orderId };
};

describe(`order cancelled listener`, () => {
  it(`unsets the orderId of the ticket`, async () => {
    const { listener, ticket, data, msg } = await setup();

    // call the onMessage function with the data object and the message
    // object
    await listener.onMessage(data, msg);

    // write assertions to make sure the ticket's orderId was unset
    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket?.orderId).toBeUndefined();
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
    const { listener, data, msg } = await setup();

    // call the onMessage function with the data object and the message
    // object
    await listener.onMessage(data, msg);

    const ticketUpdatedData = JSON.parse(
      (natsWrapper.stan.publish as jest.Mock).mock.calls[0][1],
    );

    // write assertions to make sure the publish function was called
    expect(natsWrapper.stan.publish).toHaveBeenCalled();
    expect((natsWrapper.stan.publish as jest.Mock).mock.calls[0][0]).toBe(
      Subjects.TICKET_UPDATED,
    );
    expect(ticketUpdatedData.orderId).toBeUndefined();
  });
});
