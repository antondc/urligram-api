import { Request, Response } from 'express';

import { IStateResetContentUseCase } from '@domain/state/useCases/StateResetContentUseCase';
import { BaseController } from './BaseController';

export class StateResetContentController extends BaseController {
  resetContentUseCase: IStateResetContentUseCase;

  constructor(resetContentUseCase: IStateResetContentUseCase) {
    super();
    this.resetContentUseCase = resetContentUseCase;
  }

  async executeImpl(req: Request, res: Response) {
    const response = await this.resetContentUseCase.execute();

    return res.status(200).send(response);
  }
}
