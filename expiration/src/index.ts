import { natsWrapper } from './nats-wrapper';
import OrderCreatedListener from './events/listeners/order-created-listener';

const start = async () => {
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error(`NATS_CLUSTER_ID env variable must be defined.`);
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error(`NATS_CLIENT_ID env variable must be defined.`);
  }

  if (!process.env.NATS_URL) {
    throw new Error(`NATS_URL env variable must be defined.`);
  }

  if (!process.env.REDIS_HOST) {
    throw new Error(`REDIS_HOST env variable must be defined.`);
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
  } catch (err) {
    console.error(err);
  }
};

start();
