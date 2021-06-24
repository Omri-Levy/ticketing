import { Request, Response, Router } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from "@omrilevyorg/common";
import User from "../models/User";

const signUp = Router();

signUp.post(
  `/api/users/signUp`,
  [
    body(`email`).isEmail().withMessage(`Email must be valid.`),
    body(`password`)
      .trim()
      .isLength({
        min: 4,
        max: 20,
      })
      .withMessage(`Password must be between 4 and 20 characters.`),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new BadRequestError(`Email is already in use.`);
    }

    console.log(`Creating a user...`);

    // the password is hashed in models/Order.ts, using mongoose's pre save
    // functionality.
    const user = User.build({ email, password });

    await user.save();

    const jwtToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!
    );

    req.session = {
      token: jwtToken,
    };

    return res.status(201).send(user);
  }
);

export default signUp;
