import mongoose from "mongoose";
import { Password } from "../services/password";

// an interfice to describe properties to create new user (what it takes to create an user)
interface UserAttrs {
  email: string;
  password: string;
}

// an interface thet describes User Model (collection of users)
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// an interface with User Document properties (what single user has)
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// these are mongoose types (not TS)
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String, // string in TS
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  // custom preperties used when serialized to JSON
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret.__v;
        // remove property from object
        delete ret.password;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

// pre save hooks
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// build mongo object with TS validation
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
