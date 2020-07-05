import express, { NextFunction, Request, Response } from 'express';

import { ListCreateUseCase } from '@domain/list/useCases/ListCreateUseCase';
import { ListDeleteUseCase } from '@domain/list/useCases/ListDeleteUseCase';
import { ListGetOneUseCase } from '@domain/list/useCases/ListGetOneUseCase';
import { ListUpdateUseCase } from '@domain/list/useCases/ListUpdateUseCase';
import { ListCreateController } from '@infrastructure/http/controllers/ListCreateController';
import { ListDeleteController } from '@infrastructure/http/controllers/ListDeleteController';
import { ListGetOneController } from '@infrastructure/http/controllers/ListGetOneController';
import { ListUpdateController } from '@infrastructure/http/controllers/ListUpdateController';
import { ListRepo } from '@infrastructure/persistence/mySQL/repositories/ListRepo';

const ListsRoute = express.Router();

ListsRoute.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listGetOneUseCase = new ListGetOneUseCase(listRepo);
  const listGetOneController = new ListGetOneController(listGetOneUseCase);

  const response = await listGetOneController.execute(req, res, next);

  return response;
});

ListsRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listCreateUseCase = new ListCreateUseCase(listRepo);
  const listCreateController = new ListCreateController(listCreateUseCase);

  const response = await listCreateController.execute(req, res, next);

  return response;
});

ListsRoute.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listUpdateUseCase = new ListUpdateUseCase(listRepo);
  const listUpdateController = new ListUpdateController(listUpdateUseCase);

  const response = await listUpdateController.execute(req, res, next);

  return response;
});

ListsRoute.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listDeleteUseCase = new ListDeleteUseCase(listRepo);
  const listDeleteController = new ListDeleteController(listDeleteUseCase);

  const response = await listDeleteController.execute(req, res, next);

  return response;
});

export { ListsRoute };
