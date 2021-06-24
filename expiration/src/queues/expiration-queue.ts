import Queue from 'bull';
import { Payload } from './types';
import ExpirationCompletePublisher from '../events/publishers/expiration-complete-publisher';
import { natsWrapper } from '../nats-wrapper';

const expirationQueue = new Queue<Payload>(`order:expiration`, {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  new ExpirationCompletePublisher(natsWrapper.stan).publish({
    orderId: job.data.orderId,
  });
});

export default expirationQueue;
