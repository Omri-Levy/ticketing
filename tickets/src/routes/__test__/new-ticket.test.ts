import request from 'supertest';
import { Subjects } from '@omrilevyorg/common';
import app from '../../app';
import Ticket from '../../models/Ticket';
import { testTicket } from './utils/constants';
import { natsWrapper } from '../../nats-wrapper';

describe(`new ticket`, () => {
  const cookie = global.fakeAuth();

  it(`has a route handler listening to api/tickets for post requests`, async () => {
    const res = await request(app).post(`/api/tickets`).send();

    expect(res.status).not.toBe(404);
  });

  it(`returns a 401 response status code if the user is not authenticated`, async () => {
    await request(app).post(`/api/tickets`).send().expect(401);
  });

  it(`returns an error if an invalid title is provided`, async () => {
    await request(app)
      .post(`/api/tickets`)
      .send({
        title: ``,
        price: testTicket.price,
      })
      .set(`Cookie`, cookie)
      .expect(400);

    await request(app)
      .post(`/api/tickets`)
      .send({
        price: testTicket.price,
      })
      .set(`Cookie`, cookie)
      .expect(400);
  });

  it(`returns an error if an invalid price is provided`, async () => {
    await request(app)
      .post(`/api/tickets`)
      .set(`Cookie`, cookie)
      .send({
        title: testTicket.title,
        price: -10,
      })
      .expect(400);

    await request(app)
      .post(`/api/tickets`)
      .set(`Cookie`, cookie)
      .send({
        title: testTicket.title,
      })
      .expect(400);
  });

  it(`creates a ticket with valid inputs`, async () => {
    const ticketsCount = await Ticket.estimatedDocumentCount();

    expect(ticketsCount).toBe(0);

    await request(app)
      .post(`/api/tickets`)
      .set(`Cookie`, cookie)
      .send(testTicket)
      .expect(201);

    const createdTicket = await Ticket.find({});

    expect(createdTicket).toHaveLength(1);
    expect(createdTicket[0].title).toBe(testTicket.title);
    expect(createdTicket[0].price).toBe(testTicket.price);
  });

  it(`publishes a ticket created event`, async () => {
    await request(app)
      .post(`/api/tickets`)
      .set(`Cookie`, cookie)
      .send(testTicket)
      .expect(201);

    expect(natsWrapper.stan.publish).toHaveBeenCalled();
    expect((natsWrapper.stan.publish as jest.Mock).mock.calls[0][0]).toBe(
      Subjects.TICKET_CREATED,
    );
  });
});
