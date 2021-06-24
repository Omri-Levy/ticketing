import request from 'supertest';
import { Subjects } from '@omrilevyorg/common';
import app from '../../app';
import routeFound from './utils/functions/routeFound';
import genFakeMongoId from './utils/functions/genFakeMongoId';
import buildTicket from './utils/functions/buildTicket';
import { natsWrapper } from '../../nats-wrapper';
import { Order, OrderStatus } from '../../models/Order';

describe(`cancel order`, () => {
  const id = genFakeMongoId();
  const cookie = global.fakeAuth();
  // const orderId = genFakeMongoId();

  it(`has a route handler listening to api/orders/:orderId for patch requests`, async () => {
    const res = await request(app).patch(`/api/orders/${id}`).send();

    expect(routeFound(res.body)).toBe(true);
  });

  it(`returns a 404 response status code if the provided order does not exist`, async () => {
    await request(app)
      .patch(`/api/orders/${id}`)
      .set(`Cookie`, cookie)
      .send()
      .expect(404);
  });

  it(`returns a 401 response status code if the user is not authenticated`, async () => {
    const ticket = await buildTicket();

    // create an order
    const { body: order } = await request(app)
      .post(`/api/orders`)
      .set(`Cookie`, cookie)
      .send({
        ticketId: ticket.id,
      })
      .expect(201);

    await request(app).patch(`/api/orders/${order.id}`).send().expect(401);
  });

  it(`returns a 401 response status code if the user does not own the order`, async () => {
    const ticket = await buildTicket();

    // create an order
    const { body: order } = await request(app)
      .post(`/api/orders`)
      .set(`Cookie`, cookie)
      .send({
        ticketId: ticket.id,
      })
      .expect(201);

    await request(app)
      .patch(`/api/orders/${order.id}`)
      .set(`Cookie`, global.fakeAuth())
      .send()
      .expect(401);
  });

  it(`marks an order as cancelled`, async () => {
    const ticket = await buildTicket();

    // create an order
    const { body: order } = await request(app)
      .post(`/api/orders`)
      .set(`Cookie`, cookie)
      .send({
        ticketId: ticket.id,
      })
      .expect(201);

    await request(app)
      .patch(`/api/orders/${order.id}`)
      .set(`Cookie`, cookie)
      .send()
      .expect(204);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder?.status).toBe(OrderStatus.CANCELLED);
  });

  it(`publishes an order cancelled event`, async () => {
    const ticket = await buildTicket();

    // create an order
    const { body: order } = await request(app)
      .post(`/api/orders`)
      .set(`Cookie`, cookie)
      .send({
        ticketId: ticket.id,
      });

    await request(app)
      .patch(`/api/orders/${order.id}`)
      .set(`Cookie`, cookie)
      .send();

    expect(natsWrapper.stan.publish).toHaveBeenCalled();
    expect((natsWrapper.stan.publish as jest.Mock).mock.calls[1][0]).toBe(
      Subjects.ORDER_CANCELLED,
    );
  });
});
