import express, { Request, Response, NextFunction } from 'express';
import { HealthCheckAdapter } from '@adapter/HealthCheckAdapter';
import { HealthCheckRepo } from '@infrastructure/persistence/mySQL/repositories/HealthCheckRepo';
import { HealthCheckUseCase } from '@domain/persistence/useCases/HealthCheckUseCase';

const router = express.Router();

router.all('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const healthCheckRepo = new HealthCheckRepo();
    const healthCheckUseCase = new HealthCheckUseCase(healthCheckRepo);
    const healthCheckAdapter = new HealthCheckAdapter(healthCheckUseCase);

    const response = await healthCheckAdapter.resetContent();

    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

export default router;
