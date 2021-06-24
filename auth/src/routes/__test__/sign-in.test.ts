import request from "supertest";
import app from "../../app";
import { testCredentials } from "./utils/constants";

describe(`sign in`, () => {
  it(`has a route handler listening to api/users/signIn for post requests`, async () => {
    const res = await request(app).post(`/api/users/signIn`).send();

    expect(res.status).not.toBe(404);
  });

  it(`fails when an email that does not exist is supplied`, async () => {
    await request(app)
      .post(`/api/users/signIn`)
      .send(testCredentials)
      .expect(400);
  });

  it(`fails when an incorrect password is supplied`, async () => {
    await request(app)
      .post(`/api/users/signUp`)
      .send(testCredentials)
      .expect(201);

    await request(app)
      .post(`/api/users/signIn`)
      .send({
        email: testCredentials.email,
        password: `passworde`,
      })
      .expect(400);
  });

  it(`returns a 200 response status code on a successful sign in`, async () => {
    await request(app)
      .post(`/api/users/signUp`)
      .send(testCredentials)
      .expect(201);

    await request(app)
      .post(`/api/users/signIn`)
      .send(testCredentials)
      .expect(200);
  });

  it(`sets a cookie after successful sign in`, async () => {
    await request(app)
      .post(`/api/users/signUp`)
      .send(testCredentials)
      .expect(201);

    const res = await request(app)
      .post(`/api/users/signIn`)
      .send(testCredentials)
      .expect(200);

    expect(res.get(`Set-Cookie`)).toBeDefined();
  });
});
