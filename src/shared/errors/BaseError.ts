export class BaseError extends Error {
  message: string;
  statusCode: number;
  category: string;
  error: {} | undefined;

  constructor(message: string, statusCode: number, error?: {}) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
