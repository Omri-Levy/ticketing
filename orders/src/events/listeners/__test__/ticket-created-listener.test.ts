import { TicketCreatedEvent } from '@omrilevyorg/common';
import { Message } from 'node-nats-streaming';
import TicketCreatedListener from '../ticket-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import genFakeMongoId from '../../../routes/__test__/utils/functions/genFakeMongoId';
import { Ticket } from '../../../models/Ticket';

const setup = () => {
  // create an instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.stan);

  // create a fake data object
  /* eslint quotes: "off" */
  const data: TicketCreatedEvent['data'] = {
    version: 0,
    id: genFakeMongoId(),
    title: `test title`,
    price: 20,
    userId: genFakeMongoId(),
  };

  // create a fake message object
  // ts ignore due to just mocking the required methods for the tests
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

describe(`ticket created listener`, () => {
  it(`creates and saves a ticket`, async () => {
    const { listener, data, msg } = await setup();

    // call the onMessage function with the data object and the message
    // object
    await listener.onMessage(data, msg);

    // write assertions to make sure a ticket was created
    const ticket = await Ticket.findById(data.id);

    expect(ticket?.id).toBe(data.id);
    expect(ticket?.title).toBe(data.title);
    expect(ticket?.price).toBe(data.price);
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
