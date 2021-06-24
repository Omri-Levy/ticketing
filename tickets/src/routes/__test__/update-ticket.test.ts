import request from 'supertest';
import { Subjects } from '@omrilevyorg/common';
import app from '../../app';
import routeFound from './utils/functions/routeFound';
import genFakeMongoId from './utils/functions/genFakeMongoId';
import { testTicket } from './utils/constants';
import createTicket from './utils/functions/createTicket';
import { natsWrapper } from '../../nats-wrapper';
import Ticket from '../../models/Ticket';

describe(`update ticket`, () => {
  const id = genFakeMongoId();
  const cookie = global.fakeAuth();

  it(`has a route handler listening to api/tickets/:id for patch requests`, async () => {
    const res = await request(app).patch(`/api/tickets/${id}`).send();

    expect(routeFound(res.body)).toBe(true);
  });

  it(`returns a 404 response status code if the provided id does not exist`, async () => {
    await request(app)
      .patch(`/api/tickets/${id}`)
      .set(`Cookie`, cookie)
      .send(testTicket);
  });

  it(`returns a 401 response status code if the user is not authenticated`, async () => {
    await request(app).patch(`/api/tickets/${id}`).send(testTicket).expect(401);
  });

  it(`returns a 401 response status code if the user does not own the ticket`, async () => {
    const res = await createTicket();

    await request(app)
      .patch(`/api/tickets/${res.body.id}`)
      .set(`Cookie`, cookie)
      .send({
        title: `new test title`,
        price: 25,
      })
      .expect(401);
  });

  it(`returns a 400 response status code if the user provides an invalid title`, async () => {
    const res = await request(app)
      .post(`/api/tickets`)
      .set(`Cookie`, cookie)
      .send(testTicket);

    await request(app)
      .patch(`/api/tickets/${res.body.id}`)
      .set(`Cookie`, cookie)
      .send({
        title: ``,
        price: 25,
      })
      .expect(400);

    await request(app)
      .patch(`/api/tickets/${res.body.id}`)
      .set(`Cookie`, cookie)
      .send({
        price: 25,
      })
      .expect(400);
  });

  it(`returns a 400 response status code if the user provides an invalid price`, async () => {
    const res = await request(app)
      .post(`/api/tickets`)
      .set(`Cookie`, cookie)
      .send(testTicket);

    await request(app)
      .patch(`/api/tickets/${res.body.id}`)
      .set(`Cookie`, cookie)
      .send({
        title: `new test title`,
        price: -25,
      })
      .expect(400);

    await request(app)
      .patch(`/api/tickets/${res.body.id}`)
      .set(`Cookie`, cookie)
      .send({
        title: `new test title`,
      })
      .expect(400);
  });

  it(`returns a 400 response status code if a ticket is reserved`, async () => {
    const { body: ticket } = await request(app)
      .post(`/api/tickets`)
      .set(`Cookie`, cookie)
      .send(testTicket);

    const reservedTicket = await Ticket.findById(ticket.id);

    reservedTicket!.set({ orderId: genFakeMongoId() });

    await reservedTicket!.save();

    await request(app)
      .patch(`/api/tickets/${ticket.id}`)
      .set(`Cookie`, cookie)
      .send({
        title: `new test title`,
        price: 25,
      })
      .expect(400);
  });

  it(`updates the ticket provided valid inputs`, async () => {
    const title = `new test title`;
    const price = 25;

    const { body: ticket } = await request(app)
      .post(`/api/tickets`)
      .set(`Cookie`, cookie)
      .send(testTicket);

    await request(app)
      .patch(`/api/tickets/${ticket.id}`)
      .set(`Cookie`, cookie)
      .send({
        title,
        price,
      })
      .expect(200);

    const res = await request(app).get(`/api/tickets/${ticket.id}`).send();

    expect(res.body.title).toBe(title);
    expect(res.body.price).toBe(price);
  });

  it(`publishes a ticket updated event`, async () => {
    const { body: ticket } = await request(app)
      .post(`/api/tickets`)
      .set(`Cookie`, cookie)
      .send(testTicket);

    await request(app)
      .patch(`/api/tickets/${ticket.id}`)
      .set(`Cookie`, cookie)
      .send({
        title: `new test title`,
        price: 25,
      });

    expect(natsWrapper.stan.publish).toHaveBeenCalled();
    expect((natsWrapper.stan.publish as jest.Mock).mock.calls[1][0]).toBe(
      Subjects.TICKET_UPDATED,
    );
  });
});
