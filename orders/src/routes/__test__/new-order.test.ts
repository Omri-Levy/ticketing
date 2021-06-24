import request from 'supertest';
import { Subjects } from '@omrilevyorg/common';
import app from '../../app';
import { Order, OrderStatus } from '../../models/Order';
import { natsWrapper } from '../../nats-wrapper';
import genFakeMongoId from './utils/functions/genFakeMongoId';
import buildTicket from './utils/functions/buildTicket';

describe(`new order`, () => {
  const ticketId = genFakeMongoId();
  const cookie = global.fakeAuth();

  it(`has a route handler listening to api/orders for post requests`, async () => {
    const res = await request(app).post(`/api/orders`).send();

    expect(res.status).not.toBe(404);
  });

  it(`returns a 404 response status code if the ticket does not exist`, async () => {
    const res = await request(app)
      .post(`/api/orders`)
      .set(`Cookie`, cookie)
      .send({ ticketId });

    expect(res.status).toBe(404);
  });

  it(`returns a 401 response status code if the user is not authenticated`, async () => {
    await request(app).post(`/api/orders`).send().expect(401);
  });

  it(`returns an error if an invalid ticket id is provided`, async () => {
    const res = await request(app)
      .post(`/api/orders`)
      .set(`Cookie`, cookie)
      .send({ ticketId: `123` });

    expect(res.status).toBe(400);
  });

  it(`returns an error if the ticket is already reserved`, async () => {
    const ticket = await buildTicket();
    const order = Order.build({
      ticket,
      userId: `test-user-id`,
      status: OrderStatus.CREATED,
      expiresAt: new Date(),
    });

    await order.save();

    await request(app)
      .post(`/api/orders`)
      .set(`Cookie`, cookie)
      .send({ ticketId: ticket.id })
      .expect(400);
  });

  it(`reserves a ticket`, async () => {
    // make sure there are no orders
    const ordersCount = await Order.estimatedDocumentCount();

    expect(ordersCount).toBe(0);

    const ticket = await buildTicket();

    const res = await request(app)
      .post(`/api/orders`)
      .set(`Cookie`, cookie)
      .send({ ticketId: ticket.id })
      .expect(201);

    // see if the order was saved to the database and has the expected
    // values
    const order = await Order.findById(res.body.id).populate(`ticket`);

    expect(order?.ticket.id).toBe(ticket.id);
    expect(order?.ticket.title).toBe(ticket.title);
    expect(order?.ticket.price).toBe(ticket.price);
  });

  it(`publishes an order created event`, async () => {
    const ticket = await buildTicket();

    await request(app)
      .post(`/api/orders`)
      .set(`Cookie`, cookie)
      .send({ ticketId: ticket.id })
      .expect(201);

    expect(natsWrapper.stan.publish).toHaveBeenCalled();
    expect((natsWrapper.stan.publish as jest.Mock).mock.calls[0][0]).toBe(
      Subjects.ORDER_CREATED,
    );
  });
});
