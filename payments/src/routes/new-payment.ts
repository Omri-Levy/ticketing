import { Request, Response, Router } from 'express';
import {
  BadRequestError,
  NotFoundError,
  requireAuth,
  UnauthorizedError,
  validateRequest,
} from '@omrilevyorg/common';
import { body } from 'express-validator';
import { Order, OrderStatus } from '../models/Order';
import { stripe } from '../stripe';
import { Payment } from '../models/Payment';
import PaymentCreatedPublisher from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const newPayment = Router();

newPayment.post(
  `/api/payments`,
  requireAuth,
  [
    body(`token`).notEmpty().withMessage(`token is a required field.`),
    body(`orderId`).notEmpty().withMessage(`orderId is a required field.`),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError(`Order`);
    }

    if (order.userId !== req.currentUser.id) {
      throw new UnauthorizedError();
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new BadRequestError(`Cannot pay for a cancelled order`);
    }

    const stripeCharge = await stripe.charges.create({
      currency: `usd`,
      amount: order.price * 100,
      source: token,
    });

    const payment = Payment.build({
      stripeId: stripeCharge.id,
      orderId: order.id,
    });

    await payment.save();

    const publisher = new PaymentCreatedPublisher(natsWrapper.stan);

    publisher.publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ id: payment.id });
  },
);

export default newPayment;
