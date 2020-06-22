import { NextFunction, Request, Response } from 'express';

export abstract class BaseController {
  protected abstract executeImpl(req: Request, res: Response, next: NextFunction): Promise<unknown>;

  public async execute(req: Request, res: Response, next: NextFunction): Promise<unknown> {
    try {
      await this.executeImpl(req, res, next);
    } catch (err) {
      return next(err);
    }
  }
}
