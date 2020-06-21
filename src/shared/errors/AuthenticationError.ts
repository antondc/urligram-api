import { BaseError } from './BaseError';

export class AuthenticationError extends BaseError {
  message: string;
  category: string;
  statusCode: number;
  error: {};

  constructor(message: string, statusCode: number, error?: {}) {
    super(message, statusCode);

    this.message = message;
    this.statusCode = statusCode;
    this.category = 'Authentication Error';
    this.error = error;
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
