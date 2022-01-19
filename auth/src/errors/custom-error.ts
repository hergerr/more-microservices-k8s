export abstract class CustomError extends Error {
  // you must implement abstract properties
  abstract statusCode: number;

  constructor(message: string) {
    // message only for logging purposes
    super(message);

    // only because i am extending build in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
