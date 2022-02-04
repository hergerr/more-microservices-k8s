import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ConnectOptions } from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

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
  // other way causes memory leaks
  await mongoose.connection.close();
  await mongo.stop();
});

global.signin = () => {
  // build a JWT payload. {id, email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session object
  const session = { jwt: token };

  // turn session into json
  const sessionJSON = JSON.stringify(session);

  // encode json as base64 (like cookie-session package)
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return cookie with encoded data (supertests expects them in an array)
  return [`session=${base64}==`];
};
