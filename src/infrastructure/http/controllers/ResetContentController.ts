import { NextFunction, Request, Response } from 'express';

import { IResetContentUseCase } from '@domain/persistence/useCases/ResetContentUseCase';

export class ResetContentController {
  resetContentUseCase: IResetContentUseCase;

  constructor(resetContentUseCase: IResetContentUseCase) {
    this.resetContentUseCase = resetContentUseCase;
  }

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.resetContentUseCase.execute();

      return res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  }
}
