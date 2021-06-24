import { TicketUpdatedEvent } from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../nats-wrapper';
import genFakeMongoId from '../../../routes/__test__/utils/functions/genFakeMongoId';
import { Ticket } from '../../../models/Ticket';
import TicketUpdatedListener from '../ticket-updated-listener';

const setup = async () => {
  // create an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.stan);

  // create and save a ticket
  const ticket = Ticket.build({
    id: genFakeMongoId(),
    title: `test title`,
    price: 20,
  });

  await ticket.save();

  // create a fake data object
  /* eslint quotes: "off" */
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: `new test title`,
    price: 25,
    userId: `test-user-id`,
  };

  // create a fake message object
  // ts ignore due to just mocking the required methods for the tests
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, ticket };
};

describe(`ticket created listener`, () => {
  it(`finds, updates and saves a ticket`, async () => {
    const { listener, data, msg, ticket } = await setup();

    // call the onMessage function with the data object and the message
    // object
    await listener.onMessage(data, msg);

    // write assertions to make sure the ticket was updated
    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket?.id).toBe(data.id);
    expect(updatedTicket?.title).toBe(data.title);
    expect(updatedTicket?.price).toBe(data.price);
    expect(updatedTicket?.version).toBe(data.version);
  });

  it(`acks the message`, async () => {
    const { listener, data, msg } = await setup();

    // call the onMessage function with the data object and the message
    // object
    await listener.onMessage(data, msg);

    // write assertions to make sure the ack function was called
    expect(msg.ack).toHaveBeenCalled();
  });

  it(`does not call the ack function on version concurrency failures`, async () => {
    const { listener, data, msg } = await setup();

    data.version = 10;

    // call the onMessage function with the data object and the message
    // object
    try {
      await listener.onMessage(data, msg);
    } catch (err) {}

    // write assertions to make sure the ack function was called
    expect(msg.ack).not.toHaveBeenCalled();
  });
});
