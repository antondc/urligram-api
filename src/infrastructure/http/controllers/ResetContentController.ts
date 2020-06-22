import { Request, Response } from 'express';

import { IResetContentUseCase } from '@domain/persistence/useCases/ResetContentUseCase';
import { BaseController } from './BaseController';

export class ResetContentController extends BaseController {
  resetContentUseCase: IResetContentUseCase;

  constructor(resetContentUseCase: IResetContentUseCase) {
    super();
    this.resetContentUseCase = resetContentUseCase;
  }

  async executeImpl(req: Request, res: Response) {
    const response = await this.resetContentUseCase.execute();

    return res.status(200).send(response);
  }
}
