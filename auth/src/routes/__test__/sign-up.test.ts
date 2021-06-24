import request from "supertest";
import app from "../../app";
import { testCredentials } from "./utils/constants";

describe(`sign up`, () => {
  it(`has a route handler listening to api/users/signUp for post requests`, async () => {
    const res = await request(app).post(`/api/users/signUp`).send();

    expect(res.status).not.toBe(404);
  });

  it(`returns a 201 response status code on a successful sign up`, async () => {
    await request(app)
      .post(`/api/users/signUp`)
      .send(testCredentials)
      .expect(201);
  });

  it(`returns a 400 response status code with an invalid email`, async () => {
    await request(app)
      .post(`/api/users/signUp`)
      .send({
        email: `test`,
        password: testCredentials.password,
      })
      .expect(400);
  });

  it(`returns a 400 response status code with an invalid password`, async () => {
    await request(app)
      .post(`/api/users/signUp`)
      .send({
        email: testCredentials.email,
        password: `p`,
      })
      .expect(400);
  });

  it(`returns a 400 response status code with missing email and password`, async () => {
    await request(app)
      .post(`/api/users/signUp`)
      .send({
        email: testCredentials.email,
      })
      .expect(400);

    await request(app)
      .post(`/api/users/signUp`)
      .send({
        password: testCredentials.password,
      })
      .expect(400);

    await request(app).post(`/api/users/signUp`).send().expect(400);
  });

  it(`disallows duplicate emails`, async () => {
    await request(app)
      .post(`/api/users/signUp`)
      .send(testCredentials)
      .expect(201);

    return request(app)
      .post(`/api/users/signUp`)
      .send(testCredentials)
      .expect(400);
  });

  it(`sets a cookie after successful sign up`, async () => {
    const res = await request(app)
      .post(`/api/users/signUp`)
      .send(testCredentials)
      .expect(201);

    expect(res.get(`Set-Cookie`)).toBeDefined();
  });
});
