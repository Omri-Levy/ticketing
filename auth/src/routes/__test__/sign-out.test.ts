import request from "supertest";
import app from "../../app";
import { testCredentials } from "./utils/constants";

describe(`sign out`, () => {
  it(`has a route handler listening to api/users/signOut for post requests`, async () => {
    const res = await request(app).post(`/api/users/signOut`).send();

    expect(res.status).not.toBe(404);
  });

  it(`clears the cookie after signing out`, async () => {
    await request(app)
      .post(`/api/users/signUp`)
      .send(testCredentials)
      .expect(201);

    await request(app)
      .post(`/api/users/signIn`)
      .send(testCredentials)
      .expect(200);

    const res = await request(app)
      .post(`/api/users/signOut`)
      .send()
      .expect(200);

    expect(res.get(`Set-Cookie`)[0]).toEqual(
      `express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly`
    );
  });
});
