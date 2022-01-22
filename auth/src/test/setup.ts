import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ConnectOptions } from "mongoose";
import { app } from "../app";

let mongo: MongoMemoryServer;
// run before all tests
beforeAll(async () => {
  process.env.JWT_KEY = "asdadas";

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
});

// before each test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// after all tests
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
