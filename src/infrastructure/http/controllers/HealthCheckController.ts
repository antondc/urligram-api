import { NextFunction, Request, Response } from 'express';

import { IHealthCheckUseCase } from '@domain/persistence/useCases/HealthCheckUseCase';

export class HealthCheckController {
  healthCheckUseCase: IHealthCheckUseCase;

  constructor(healthCheckUseCase: IHealthCheckUseCase) {
    this.healthCheckUseCase = healthCheckUseCase;
  }

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.healthCheckUseCase.execute();

      return res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  }
}
