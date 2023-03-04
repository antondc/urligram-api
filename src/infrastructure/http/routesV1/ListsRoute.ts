import express, { NextFunction, Request, Response } from 'express';

import { LinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { ListBookmarkCreateOneUseCase } from '@domain/list/useCases/ListBookmarkCreateOneUseCase';
import { ListBookmarkDeleteOneUseCase } from '@domain/list/useCases/ListBookmarkDeleteOneUseCase';
import { ListBookmarkGetAllUseCase } from '@domain/list/useCases/ListBookmarkGetAllUseCase';
import { ListBookmarkGetOneUseCase } from '@domain/list/useCases/ListBookmarkGetOneUseCase';
import { ListBookmarkUserGetAllUseCase } from '@domain/list/useCases/ListBookmarkUserGetAllUseCase';
import { ListBookmarkUserUpsertOneUseCase } from '@domain/list/useCases/ListBookmarkUserUpsertOneUseCase';
import { ListCreateOneUseCase } from '@domain/list/useCases/ListCreateOneUseCase';
import { ListDeleteOneUseCase } from '@domain/list/useCases/ListDeleteOneUseCase';
import { ListGetAllUseCase } from '@domain/list/useCases/ListGetAllUseCase';
import { ListGetOneUseCase } from '@domain/list/useCases/ListGetOneUseCase';
import { ListSimilarGetAllUseCase } from '@domain/list/useCases/ListSimilarGetAllUseCase';
import { ListUpdateOneUseCase } from '@domain/list/useCases/ListUpdateOneUseCase';
import { ListUserCreateOneUseCase } from '@domain/list/useCases/ListUserCreateOneUseCase';
import { ListUserDeleteOneUseCase } from '@domain/list/useCases/ListUserDeleteOneUseCase';
import { ListUserGetAllUseCase } from '@domain/list/useCases/ListUserGetAllUseCase';
import { ListUserGetOneUseCase } from '@domain/list/useCases/ListUserGetOneUseCase';
import { ListUserUpsertOneUseCase } from '@domain/list/useCases/ListUserUpsertOneUseCase';
import { ListBookmarkCreateOneController } from '@infrastructure/http/controllers/ListBookmarkCreateOneController';
import { ListBookmarkDeleteOneController } from '@infrastructure/http/controllers/ListBookmarkDeleteOneController';
import { ListBookmarkGetAllController } from '@infrastructure/http/controllers/ListBookmarkGetAllController';
import { ListBookmarkGetOneController } from '@infrastructure/http/controllers/ListBookmarkGetOneController';
import { ListBookmarkUserGetAllController } from '@infrastructure/http/controllers/ListBookmarkUserGetAllController';
import { ListBookmarkUserUpsertOneController } from '@infrastructure/http/controllers/ListBookmarkUserUpsertOneController';
import { ListCreateOneController } from '@infrastructure/http/controllers/ListCreateOneController';
import { ListDeleteOneController } from '@infrastructure/http/controllers/ListDeleteOneController';
import { ListGetAllController } from '@infrastructure/http/controllers/ListGetAllController';
import { ListGetOneController } from '@infrastructure/http/controllers/ListGetOneController';
import { ListSimilarGetAllController } from '@infrastructure/http/controllers/ListSimilarGetAllController';
import { ListUpdateOneController } from '@infrastructure/http/controllers/ListUpdateOneController';
import { ListUserCreateOneController } from '@infrastructure/http/controllers/ListUserCreateOneController';
import { ListUserDeleteOneController } from '@infrastructure/http/controllers/ListUserDeleteOneController';
import { ListUserGetAllController } from '@infrastructure/http/controllers/ListUserGetAllController';
import { ListUserGetOneController } from '@infrastructure/http/controllers/ListUserGetOneController';
import { ListUserUpsertOneController } from '@infrastructure/http/controllers/ListUserUpsertOneController';
import { BookmarkRepo } from '@infrastructure/persistence/mySQL/repositories/BookmarkRepo';
import { LinkRepo } from '@infrastructure/persistence/mySQL/repositories/LinkRepo';
import { ListRepo } from '@infrastructure/persistence/mySQL/repositories/ListRepo';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';

const ListsRoute = express.Router();

ListsRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listGetAllUseCase = new ListGetAllUseCase(listRepo);
  const listGetAllController = new ListGetAllController(listGetAllUseCase);

  const response = await listGetAllController.execute(req, res, next);

  return response;
});

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

ListsRoute.get('/bookmarks/users/me', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listBookmarkUserGetAllUseCase = new ListBookmarkUserGetAllUseCase(listRepo);
  const listBookmarkUserGetAllController = new ListBookmarkUserGetAllController(listBookmarkUserGetAllUseCase);

  const response = await listBookmarkUserGetAllController.execute(req, res, next);

  return response;
});

ListsRoute.patch('/:listId/bookmarks/:bookmarkId/users/me', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listBookmarkUserUpsertOneUseCase = new ListBookmarkUserUpsertOneUseCase(listRepo);
  const listBookmarkUserUpsertOneController = new ListBookmarkUserUpsertOneController(listBookmarkUserUpsertOneUseCase);

  const response = await listBookmarkUserUpsertOneController.execute(req, res, next);

  return response;
});

ListsRoute.delete('/:listId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listDeleteOneUseCase = new ListDeleteOneUseCase(listRepo);
  const listDeleteOneController = new ListDeleteOneController(listDeleteOneUseCase);

  const response = await listDeleteOneController.execute(req, res, next);

  return response;
});

ListsRoute.get('/:listId/bookmarks/:bookmarkId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const linkRepo = new LinkRepo();
  const bookmarkRepo = new BookmarkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo, bookmarkRepo);
  const listBookmarkGetOneUseCase = new ListBookmarkGetOneUseCase(listRepo, linkGetStatisticsUseCase);
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

ListsRoute.get('/:listId/users', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listUsersGetAllUseCase = new ListUserGetAllUseCase(listRepo);
  const listUsersGetAllController = new ListUserGetAllController(listUsersGetAllUseCase);

  const response = await listUsersGetAllController.execute(req, res, next);

  return response;
});

ListsRoute.post('/:listId/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const userRepo = new UserRepo();
  const listUserCreateOneUseCase = new ListUserCreateOneUseCase(listRepo, userRepo);
  const listUserCreateOneController = new ListUserCreateOneController(listUserCreateOneUseCase);

  const response = await listUserCreateOneController.execute(req, res, next);

  return response;
});

ListsRoute.put('/:listId/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const userRepo = new UserRepo();
  const listUserUpsertOneUseCase = new ListUserUpsertOneUseCase(listRepo, userRepo);
  const listUserUpsertOneController = new ListUserUpsertOneController(listUserUpsertOneUseCase);

  const response = await listUserUpsertOneController.execute(req, res, next);

  return response;
});

ListsRoute.delete('/:listId/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const userRepo = new UserRepo();
  const listUserDeleteOneUseCase = new ListUserDeleteOneUseCase(listRepo, userRepo);
  const listUserDeleteOneController = new ListUserDeleteOneController(listUserDeleteOneUseCase);

  const response = await listUserDeleteOneController.execute(req, res, next);

  return response;
});

ListsRoute.put('/:listId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listUpdateUseCase = new ListUpdateOneUseCase(listRepo);
  const listUpdateController = new ListUpdateOneController(listUpdateUseCase);

  const response = await listUpdateController.execute(req, res, next);

  return response;
});

ListsRoute.get('/:listId/bookmarks', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const linkRepo = new LinkRepo();
  const userRepo = new UserRepo();
  const bookmarkRepo = new BookmarkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo, bookmarkRepo);
  const listBookmarksUseCase = new ListBookmarkGetAllUseCase(listRepo, userRepo, linkGetStatisticsUseCase);
  const listBookmarksController = new ListBookmarkGetAllController(listBookmarksUseCase);

  const response = await listBookmarksController.execute(req, res, next);

  return response;
});

ListsRoute.post('/:listId/bookmarks/:bookmarkId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const bookmarkRepo = new BookmarkRepo();
  const listBookmarkCreateOneUseCase = new ListBookmarkCreateOneUseCase(listRepo, bookmarkRepo);
  const listBookmarkCreateOneController = new ListBookmarkCreateOneController(listBookmarkCreateOneUseCase);

  const response = await listBookmarkCreateOneController.execute(req, res, next);

  return response;
});

ListsRoute.delete('/:listId/bookmarks/:bookmarkId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const bookmarkRepo = new BookmarkRepo();
  const listBookmarkDeleteOneUseCase = new ListBookmarkDeleteOneUseCase(listRepo, bookmarkRepo);
  const listBookmarkDeleteOneController = new ListBookmarkDeleteOneController(listBookmarkDeleteOneUseCase);

  const response = await listBookmarkDeleteOneController.execute(req, res, next);

  return response;
});

ListsRoute.get('/:listId/similar', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listSimilarGetAllUseCase = new ListSimilarGetAllUseCase(listRepo);
  const listSimilarGetAllController = new ListSimilarGetAllController(listSimilarGetAllUseCase);

  const response = await listSimilarGetAllController.execute(req, res, next);

  return response;
});

export { ListsRoute };
