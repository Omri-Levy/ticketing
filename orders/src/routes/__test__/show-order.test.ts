import request from "supertest";
import app from "../../app";
import routeFound from "./utils/functions/routeFound";
import genFakeMongoId from "./utils/functions/genFakeMongoId";
import buildTicket from "./utils/functions/buildTicket";

describe(`show order`, () => {
  const orderId = genFakeMongoId();
  const cookie = global.fakeAuth();

  it(`has a route handler listening to api/orders/:orderId for get requests`, async () => {
    const res = await request(app).get(`/api/orders/${orderId}`).send();

    expect(routeFound(res.body)).toBe(true);
  });

  it(`returns a 404 response status code if the order with the provided id is not found`, async () => {
    await request(app)
      .get(`/api/orders/${orderId}`)
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
      });

    await request(app).get(`/api/orders/${order.id}`).send().expect(401);
  });

  it(`fetches the order`, async () => {
    const ticket = await buildTicket();

    // create an order
    const { body: order } = await request(app)
      .post(`/api/orders`)
      .set(`Cookie`, cookie)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app)
      .get(`/api/orders/${order.id}`)
      .set(`Cookie`, cookie)
      .send()
      .expect(200);
  });

  it(`returns a 401 response status code if a user tries to fetch another user's order`, async () => {
    const ticket = await buildTicket();

    // create an order
    const { body: order } = await request(app)
      .post(`/api/orders`)
      .set(`Cookie`, cookie)
      .send({ ticketId: ticket.id });

    await request(app)
      .get(`/api/orders/${order.id}`)
      .set(`Cookie`, global.fakeAuth())
      .send()
      .expect(401);
  });
});
