import { BaseError } from './BaseError';

export class AuthenticationError extends BaseError {
  message: string;
  category: string;
  statusCode: number;
  error: string;

  constructor(message: string, statusCode: number, error: string) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.category = 'Authentication Error';
    this.error = error;
  }
}
