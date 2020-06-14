import { BaseError } from './BaseError';

export class RequestError extends BaseError {
  message: string;
  category: string;
  statusCode: number;
  error: {};

  constructor(message: string, statusCode: number, error?: {}) {
    super(message, statusCode);

    this.message = message;
    this.statusCode = statusCode;
    this.category = 'Response Error';
    this.error = error;
    Object.setPrototypeOf(this, RequestError.prototype);
  }
}
