import express, { NextFunction, Request, Response } from 'express';

import { WeatherGetUseCase } from '@domain/weather/useCases/WeatherGetUseCase';
import { WeatherGetController } from '@infrastructure/http/controllers//WeatherGetController';
import { WttrRepo } from '@infrastructure/persistence/APIs/repositories/WttrRepo';

const WeatherRoute = express.Router();

WeatherRoute.get('/single', async (req: Request, res: Response, next: NextFunction) => {
  const wttrRepo = new WttrRepo()
  const weatherGetUseCase = new WeatherGetUseCase(wttrRepo);
  const weatherGetController = new WeatherGetController(weatherGetUseCase);

  const response = await weatherGetController.execute(req, res, next);

  return response;
});

export { WeatherRoute };
