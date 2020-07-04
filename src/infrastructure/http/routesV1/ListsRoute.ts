import express, { NextFunction, Request, Response } from 'express';

import { ListCreateUseCase } from '@domain/list/useCases/ListCreateUseCase';
import { ListCreateController } from '@infrastructure/http/controllers/ListCreateController';
import { ListRepo } from '@infrastructure/persistence/mySQL/repositories/ListRepo';

const ListsRoute = express.Router();

ListsRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listCreateUseCase = new ListCreateUseCase(listRepo);
  const listCreateController = new ListCreateController(listCreateUseCase);

  const response = await listCreateController.execute(req, res, next);

  return response;
});

export { ListsRoute };
