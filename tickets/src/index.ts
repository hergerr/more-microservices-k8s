import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined (make k8s secret)");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    // ticketing from cid flag in deployment
    await natsWrapper.connect(
      "ticketing",
      "adsasmmdsa",
      "http://nats-srv:4222"
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    // creates non-existing database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongo");
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
