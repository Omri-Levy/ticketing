import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import genFakeMongoId from "../routes/__test__/utils/functions/genFakeMongoId";

declare global {
  namespace NodeJS {
    interface Global {
      fakeAuth(): string;
    }
  }
}

jest.mock(`../nats-wrapper`);

let mongo: any;
dotenv.config({ path: `${__dirname}/.env.test` });

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  collections.forEach(async (collection) => {
    await collection.deleteMany({});
  });
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.fakeAuth = () => {
  const payload = {
    id: genFakeMongoId(),
    email: `test@test.com`,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET!);
  const tokenJSON = JSON.stringify({ token });
  const base64 = Buffer.from(tokenJSON).toString(`base64`);

  return `express:sess=${base64}`;
};
