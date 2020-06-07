import { BaseError } from './BaseError';

export class RequestError extends BaseError {
  message: string;
  category: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.category = 'Response Error';
  }
}
