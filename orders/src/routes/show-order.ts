import { Request, Response, Router } from "express";
import {
  NotFoundError,
  requireAuth,
  UnauthorizedError,
  validateRequest,
} from "@omrilevyorg/common";
import { param } from "express-validator";
import mongoose from "mongoose";
import { Order } from "../models/Order";

const showOrder = Router();

showOrder.get(
  `/api/orders/:orderId`,
  requireAuth,
  [
    param(`orderId`)
      .notEmpty()
      .custom((orderId) => mongoose.Types.ObjectId.isValid(orderId))
      .withMessage(`orderId is a required param.`),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate(`ticket`);

    if (!order) {
      throw new NotFoundError(`Order`);
    }

    if (order.userId !== req.currentUser.id) {
      throw new UnauthorizedError();
    }

    res.send(order);
  }
);

export default showOrder;
