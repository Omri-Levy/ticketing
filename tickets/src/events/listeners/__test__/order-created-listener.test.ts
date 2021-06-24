import { OrderCreatedEvent, OrderStatus, Subjects } from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import Ticket from '../../../models/Ticket';
import { natsWrapper } from '../../../nats-wrapper';
import genFakeMongoId from '../../../routes/__test__/utils/functions/genFakeMongoId';
import OrderCreatedListener from '../order-created-listener';

const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.stan);

  // build and save a new ticket
  const ticket = Ticket.build({
    title: `test title`,
    price: 20,
    userId: `test-user-id`,
  });

  await ticket.save();

  // create a fake data object
  /* eslint quotes: "off" */
  const data: OrderCreatedEvent['data'] = {
    id: genFakeMongoId(),
    version: 0,
    status: OrderStatus.CREATED,
    userId: genFakeMongoId(),
    expiresAt: `test expiration`,
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // create a fake message object
  // ts ignore due to just mocking the required methods for the tests
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

describe(`order created listener`, () => {
  it(`sets the userId of the ticket`, async () => {
    const { listener, ticket, data, msg } = await setup();

    // call the onMessage function with the data object and the message
    // object
    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket?.orderId).toBe(data.id);
  });

  it(`acks the message`, async () => {
    const { listener, data, msg } = await setup();

    // call the onMessage function with the data object and the message
    // object
    await listener.onMessage(data, msg);

    // write assertions to make sure the ack function was called
    expect(msg.ack).toHaveBeenCalled();
  });

  it(`publishes a ticket updated event`, async () => {
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
    expect(data.id).toBe(ticketUpdatedData.orderId);
  });
});
