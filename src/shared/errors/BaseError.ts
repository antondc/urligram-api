export class BaseError extends Error {
  message: string;
  category: string;
  statusCode: number;

  constructor(message: string, category?: string, statusCode?: number) {
    super();
    this.message = message;
    this.category = category;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
