import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  statusCode = 400;

  // short assigning syntax
  constructor(public errors: ValidationError[]) {
    super();

    // only because i am extending build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
