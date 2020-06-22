import express, { NextFunction, Request, Response } from 'express';

import { HealthCheckUseCase } from '@domain/persistence/useCases/HealthCheckUseCase';
import { ResetContentUseCase } from '@domain/persistence/useCases/ResetContentUseCase';
import { HealthCheckController } from '@infrastructure/http/controllers/HealthCheckController';
import { ResetContentController } from '@infrastructure/http/controllers/ResetContentController';
import { StateRepo } from '@infrastructure/persistence/mySQL/repositories/StateRepo';

const StateRoute = express.Router();

StateRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stateRepo = new StateRepo();
    const healthCheckUseCase = new HealthCheckUseCase(stateRepo);
    const healthCheckController = new HealthCheckController(healthCheckUseCase);

    const response = await healthCheckController.execute();

    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

StateRoute.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stateRepo = new StateRepo();
    const resetContentUseCase = new ResetContentUseCase(stateRepo);
    const resetContentController = new ResetContentController(resetContentUseCase);

    const response = await resetContentController.execute();

    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

export { StateRoute };
