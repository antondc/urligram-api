import express, { NextFunction, Request, Response } from 'express';

import { ListBookmarkGetOneUseCase } from '@domain/list/useCases/ListBookmarkGetOneUseCase';
import { ListCreateOneUseCase } from '@domain/list/useCases/ListCreateOneUseCase';
import { ListGetOneUseCase } from '@domain/list/useCases/ListGetOneUseCase';
import { ListUserGetOneUseCase } from '@domain/list/useCases/ListUserGetOneUseCase';
import { ListRepo } from '@infrastructure/persistence/mySQL/repositories/ListRepo';
import { ListBookmarkGetOneController } from '../controllers/ListBookmarkGetOneController';
import { ListCreateOneController } from '../controllers/ListCreateOneController';
import { ListGetOneController } from '../controllers/ListGetOneController';
import { ListUserGetOneController } from '../controllers/ListUserGetOneController';

const ListsRoute = express.Router();

ListsRoute.get('/:listId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listGetOneUseCase = new ListGetOneUseCase(listRepo);
  const listGetOneController = new ListGetOneController(listGetOneUseCase);

  const response = await listGetOneController.execute(req, res, next);

  return response;
});

ListsRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listCreateOneUseCase = new ListCreateOneUseCase(listRepo);
  const listCreateOneController = new ListCreateOneController(listCreateOneUseCase);

  const response = await listCreateOneController.execute(req, res, next);

  return response;
});

ListsRoute.get('/:listId/bookmarks/:bookmarkId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listBookmarkGetOneUseCase = new ListBookmarkGetOneUseCase(listRepo);
  const listBookmarkGetOneController = new ListBookmarkGetOneController(listBookmarkGetOneUseCase);

  const response = await listBookmarkGetOneController.execute(req, res, next);

  return response;
});

ListsRoute.get('/:listId/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listUsersGetOneUseCase = new ListUserGetOneUseCase(listRepo);
  const listUsersGetOneController = new ListUserGetOneController(listUsersGetOneUseCase);

  const response = await listUsersGetOneController.execute(req, res, next);

  return response;
});

export { ListsRoute };
