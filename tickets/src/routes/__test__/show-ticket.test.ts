import request from "supertest";
import app from "../../app";
import routeFound from "./utils/functions/routeFound";
import genFakeMongoId from "./utils/functions/genFakeMongoId";
import { testTicket } from "./utils/constants";

describe(`show ticket`, () => {
  const id = genFakeMongoId();

  it(`has a route handler listening to api/tickets/:id for get requests`, async () => {
    const res = await request(app).get(`/api/tickets/${id}`).send();

    expect(routeFound(res.body)).toBe(true);
  });

  it(`returns a 404 response status code if the ticket with the provided id is not found`, async () => {
    await request(app).post(`/api/tickets/${id}`).send().expect(404);
  });

  it(`returns a newly created ticket using its id`, async () => {
    const { body: ticket } = await request(app)
      .post(`/api/tickets`)
      .send(testTicket)
      .set(`Cookie`, global.fakeAuth())
      .expect(201);

    const res = await request(app)
      .get(`/api/tickets/${ticket.id}`)
      .send()
      .expect(200);

    expect(res.body.title).toBe(testTicket.title);
    expect(res.body.price).toBe(testTicket.price);
  });
});
