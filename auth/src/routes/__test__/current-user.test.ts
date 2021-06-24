import request from "supertest";
import app from "../../app";
import { testCredentials } from "./utils/constants";

describe(`current user`, () => {
  it(`has a route handler listening to api/users/currentUser for get requests`, async () => {
    const res = await request(app).get(`/api/users/currentUser`).send();

    expect(res.status).not.toBe(404);
  });

  it(`responds with details about the current user`, async () => {
    const agent = request.agent(app);

    await agent.post(`/api/users/signUp`).send(testCredentials).expect(201);

    const res = await agent.get(`/api/users/currentUser`).send().expect(200);

    expect(res.body.currentUser.email).toEqual(`test@test.com`);
  });

  it(`responds with null if not authenticated`, async () => {
    const res = await request(app)
      .get(`/api/users/currentUser`)
      .send()
      .expect(200);

    expect(res.body.currentUser).toBeNull();
  });
});
