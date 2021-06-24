import { Request, Response, Router } from "express";
import { NotFoundError, requireAuth } from "@omrilevyorg/common";
import { Order } from "../models/Order";

const index = Router();

index.get(`/api/orders`, requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({ userId: req.currentUser.id }).populate(
    `ticket`
  );

  if (!orders) {
    throw new NotFoundError(`Orders`);
  }

  res.send(orders);
});

export default index;
