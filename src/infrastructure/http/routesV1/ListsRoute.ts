import express, { NextFunction, Request, Response } from 'express';

import { ListGetOneUseCase } from '@domain/list/useCases/ListGetOneUseCase';
import { ListRepo } from '@infrastructure/persistence/mySQL/repositories/ListRepo';
import { ListGetOneController } from '../controllers/ListGetOneController';

const ListsRoute = express.Router();

ListsRoute.get('/:listId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listGetOneUseCase = new ListGetOneUseCase(listRepo);
  const listGetOneController = new ListGetOneController(listGetOneUseCase);

  const response = await listGetOneController.execute(req, res, next);

  return response;
});

export { ListsRoute };
