import mongoose from 'mongoose';
import app from './app';
import { natsWrapper } from './nats-wrapper';
import OrderCreatedListener from './events/listeners/order-created-listener';
import OrderCancelledListener from './events/listeners/order-cancelled-listener';

const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error(`JWT_SECRET env variable must be defined.`);
  }

  if (!process.env.MONGO_URI) {
    throw new Error(`MONGO_URI env variable must be defined.`);
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error(`NATS_CLUSTER_ID env variable must be defined.`);
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error(`NATS_CLIENT_ID env variable must be defined.`);
  }

  if (!process.env.NATS_URL) {
    throw new Error(`NATS_URL env variable must be defined.`);
  }

  if (!process.env.STRIPE_SECRET) {
    throw new Error(`STRIPE_SECRET env variable must be defined.`);
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL,
    );

    natsWrapper.stan.on(`close`, () => {
      console.log(`NATS connection closed.`);

      // closes connection to NATS and re-connects as Kubernetes pods get
      // created and destroyed
      process.exit();
    });
    process.on(`SIGINT`, () => natsWrapper.stan.close());
    process.on(`SIGTERM`, () => natsWrapper.stan.close());

    new OrderCreatedListener(natsWrapper.stan).listen();
    new OrderCancelledListener(natsWrapper.stan).listen();

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`Connected to MongoDb.`);
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, async () => {
    console.log(`Listening on http://localhost:3000`);
  });
};

start();
