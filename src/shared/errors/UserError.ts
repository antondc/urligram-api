import { BaseError } from './BaseError';

export class UserError extends BaseError {
  message: string;
  category: string;
  statusCode: number;
  error: {};

  constructor(message: string, statusCode: number, error?: {}) {
    super(message, statusCode);

    this.message = message;
    this.statusCode = statusCode;
    this.category = 'User Error';
    this.error = error;
    Object.setPrototypeOf(this, UserError.prototype);
  }
}
