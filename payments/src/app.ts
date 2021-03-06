import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@tftickects/common";
import { createChargeRouter } from "./routes/new";

const app = express();
// stuff is proxied through ingress. Trust it
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // cookie only used in https connection (in prod)
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(createChargeRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// middleware
app.use(errorHandler);

export { app };
