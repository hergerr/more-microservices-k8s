import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  // short assigning syntax
  constructor(public errors: ValidationError[]) {
    super("Invalid request purposes");

    // only because i am extending build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
