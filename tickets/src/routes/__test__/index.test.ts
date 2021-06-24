import request from "supertest";
import app from "../../app";
import createTicket from "./utils/functions/createTicket";
import routeFound from "./utils/functions/routeFound";

describe(`index`, () => {
  it(`has a route handler listening to api/tickets for get requests`, async () => {
    const res = await request(app).get(`/api/tickets`).send();

    expect(routeFound(res.body)).toBe(true);
  });

  it(`can fetch a list of tickets`, async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const res = await request(app).get(`/api/tickets`).send().expect(200);

    expect(res.body).toHaveLength(3);
  });
});
