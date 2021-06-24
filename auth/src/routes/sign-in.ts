import { Request, Response, Router } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from "@omrilevyorg/common";
import User from "../models/User";
import PasswordManager from "../utils/password-manager";

const signIn = Router();

signIn.post(
  `/api/users/signIn`,
  [
    body(`email`).isEmail().withMessage(`Email must be valid.`),
    body(`password`)
      .trim()
      .notEmpty()
      .withMessage(`Password is a required field.`),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    let passwordsMatch;

    if (existingUser) {
      passwordsMatch = await PasswordManager.compare(
        existingUser.password,
        password
      );
    }

    if (!existingUser || !passwordsMatch) {
      throw new BadRequestError(`Wrong email or password.`);
    }

    const jwtToken = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET!
    );

    req.session = {
      token: jwtToken,
    };

    res.status(200).send(existingUser);
  }
);

export default signIn;
