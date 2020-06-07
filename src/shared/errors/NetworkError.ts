import { BaseError } from './BaseError';

export class NetWorkError extends BaseError {
  message: string;
  category: string;
  status: number;
  error: string;

  constructor(message: string, status: number, error: string) {
    super(message);

    this.message = message;
    this.status = status;
    this.category = 'Network Error';
    this.error = error;
    Object.setPrototypeOf(this, NetWorkError.prototype);
  }
}
