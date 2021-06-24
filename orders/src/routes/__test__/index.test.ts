import request from "supertest";
import app from "../../app";
import routeFound from "./utils/functions/routeFound";
import buildTicket from "./utils/functions/buildTicket";

describe(`index`, () => {
  it(`has a route handler listening to api/orders for get requests`, async () => {
    const res = await request(app).get(`/api/orders`).send();

    expect(routeFound(res.body)).toBe(true);
  });

  it(`returns a 401 response status code if the user is not authenticated`, async () => {
    await request(app).get(`/api/orders`).send().expect(401);
  });

  it(`fetches orders for a particular user`, async () => {
    const ticketOne = await buildTicket();
    const ticketTwo = await buildTicket();
    const ticketThree = await buildTicket();

    const cookieOne = global.fakeAuth();
    const cookieTwo = global.fakeAuth();

    // create one order as user #1
    await request(app)
      .post(`/api/orders`)
      .set(`Cookie`, cookieOne)
      .send({ ticketId: ticketOne.id })
      .expect(201);

    // create two orders as user #2
    const { body: orderOne } = await request(app)
      .post(`/api/orders`)
      .set(`Cookie`, cookieTwo)
      .send({ ticketId: ticketTwo.id })
      .expect(201);
    const { body: orderTwo } = await request(app)
      .post(`/api/orders`)
      .set(`Cookie`, cookieTwo)
      .send({ ticketId: ticketThree.id })
      .expect(201);

    // make request to get orders for user #2
    const res = await request(app)
      .get(`/api/orders`)
      .set(`Cookie`, cookieTwo)
      .expect(200);

    // make sure we only got the orders for user #2
    expect(res.body).toHaveLength(2);
    expect(res.body[0].id).toBe(orderOne.id);
    expect(res.body[1].id).toBe(orderTwo.id);

    // make sure the expected tickets were inserted
    expect(res.body[0].ticket.id).toBe(ticketTwo.id);
    expect(res.body[0].ticket.title).toBe(ticketTwo.title);
    expect(res.body[0].ticket.price).toBe(ticketTwo.price);

    expect(res.body[1].ticket.id).toBe(ticketThree.id);
    expect(res.body[1].ticket.title).toBe(ticketThree.title);
    expect(res.body[1].ticket.price).toBe(ticketThree.price);
  });
});
