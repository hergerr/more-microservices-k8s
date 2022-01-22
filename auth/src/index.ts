import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined (make k8s secret)");
  }

  try {
    // creates non-existing database
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to mongo");
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
