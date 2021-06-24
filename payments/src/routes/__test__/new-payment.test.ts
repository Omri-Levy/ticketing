import request from 'supertest';
import { OrderStatus, Subjects } from '@omrilevyorg/common';
import app from '../../app';
import { Order } from '../../models/Order';
import genFakeMongoId from './utils/functions/genFakeMongoId';
import { stripe } from '../../stripe';
import { Payment } from '../../models/Payment';
import { natsWrapper } from '../../nats-wrapper';

describe(`new payment`, () => {
  const cookie = global.fakeAuth();

  it(
    `returns a 404 response status code when purchasing an order that` +
      ` does not exist`,
    async () => {
      await request(app)
        .post(`/api/payments`)
        .set(`Cookie`, cookie)
        .send({
          token: `test-token`,
          orderId: genFakeMongoId(),
        })
        .expect(404);
    },
  );

  it(
    `returns a 401 response status code when purchasing an order that` +
      ` does not belong to the user`,
    async () => {
      const order = Order.build({
        id: genFakeMongoId(),
        userId: genFakeMongoId(),
        status: OrderStatus.CREATED,
        price: 20,
        version: 0,
      });

      await order.save();

      await request(app)
        .post(`/api/payments`)
        .set(`Cookie`, cookie)
        .send({
          token: `test-token`,
          orderId: order.id,
        })
        .expect(401);
    },
  );

  it(`returns a 400 response status code when purchasing a cancelled order`, async () => {
    const userId = genFakeMongoId();
    const order = Order.build({
      id: genFakeMongoId(),
      userId,
      status: OrderStatus.CANCELLED,
      price: 20,
      version: 0,
    });

    await order.save();

    await request(app)
      .post(`/api/payments`)
      .set(`Cookie`, global.fakeAuth(userId))
      .send({
        token: `test-token`,
        orderId: order.id,
      })
      .expect(400);
  });

  it(`returns a 201 response status code with valid inputs`, async () => {
    const userId = genFakeMongoId();
    const price = Math.floor(Math.random() * 100000) + 1;
    const order = Order.build({
      id: genFakeMongoId(),
      userId,
      status: OrderStatus.CREATED,
      price,
      version: 0,
    });

    await order.save();

    await request(app)
      .post(`/api/payments`)
      .set(`Cookie`, global.fakeAuth(userId))
      .send({
        token: `tok_visa`,
        orderId: order.id,
      })
      .expect(201);

    const stripeCharges = await stripe.charges.list({ limit: 50 });
    const stripeCharge = stripeCharges.data?.find(
      (charge) => charge.amount === price * 100,
    );

    expect(stripeCharge).toBeDefined();
    expect(stripeCharge?.currency).toBe(`usd`);

    const payment = await Payment.findOne({
      stripeId: stripeCharge?.id,
      orderId: order.id,
    });

    expect(payment).not.toBeNull();
  });

  it(`publishes a payment created event`, async () => {
    const userId = genFakeMongoId();
    const price = Math.floor(Math.random() * 100000) + 1;
    const order = Order.build({
      id: genFakeMongoId(),
      userId,
      status: OrderStatus.CREATED,
      price,
      version: 0,
    });

    await order.save();

    await request(app)
      .post(`/api/payments`)
      .set(`Cookie`, global.fakeAuth(userId))
      .send({
        token: `tok_visa`,
        orderId: order.id,
      })
      .expect(201);

    expect(natsWrapper.stan.publish).toHaveBeenCalled();
    expect((natsWrapper.stan.publish as jest.Mock).mock.calls[0][0]).toBe(
      Subjects.PAYMENT_CREATED,
    );
  });
});
