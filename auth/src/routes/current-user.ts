import { Router } from "express";
import { currentUser as currentUserMiddleware } from "@omrilevyorg/common";

const currentUser = Router();

currentUser.get(
  `/api/users/currentUser`,
  currentUserMiddleware,
  async (req, res) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export default currentUser;
