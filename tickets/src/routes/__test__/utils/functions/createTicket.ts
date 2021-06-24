import request from "supertest";
import app from "../../../../app";
import { testTicket } from "../constants";

const createTicket = () =>
  request(app)
    .post(`/api/tickets`)
    .set(`Cookie`, global.fakeAuth())
    .send(testTicket);

export default createTicket;
