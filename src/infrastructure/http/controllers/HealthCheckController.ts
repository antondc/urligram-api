import { Request, Response } from 'express';

import { IHealthCheckUseCase } from '@domain/persistence/useCases/HealthCheckUseCase';
import { BaseController } from './BaseController';

export class HealthCheckController extends BaseController {
  useCase: IHealthCheckUseCase;

  constructor(useCase: IHealthCheckUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const response = await this.useCase.execute();

    return res.status(200).send(response);
  }
}
