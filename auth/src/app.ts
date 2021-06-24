import "express-async-errors";
import express, { json } from "express";
import cookieSession from "cookie-session";
import helmet from "helmet";
import { errorHandler, NotFoundError } from "@omrilevyorg/common";
import signIn from "./routes/sign-in";
import signOut from "./routes/sign-out";
import signUp from "./routes/sign-up";
import currentUser from "./routes/current-user";

// app was made in a separate file and not in index.tsx due to supertest and
// to avoid app.listen port already in use conflicts, and, also makes concurrent
// tests possible.
const app = express();
// due to ingress nginx
app.set(`trust proxy`, true);
app.use(helmet());
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== `test`,
  })
);

app.use(currentUser);
app.use(signUp);
app.use(signIn);
app.use(signOut);

// catches 404 response error/non-existent route
app.all(`*`, () => {
  throw new NotFoundError(`Route`);
});

app.use(errorHandler);

export default app;
