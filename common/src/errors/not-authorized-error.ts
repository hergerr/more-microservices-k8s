import { CustomError } from "./custom-error";

export class NothAuthorizedError extends CustomError {
  statusCode: number = 401;

  constructor() {
    super("Not authorized");

    Object.setPrototypeOf(this, NothAuthorizedError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Not authorized" }];
  }
}
