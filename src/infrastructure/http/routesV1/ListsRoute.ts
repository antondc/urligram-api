import express, { NextFunction, Request, Response } from 'express';

import { ListBookmarkCreateOneUseCase } from '@domain/list/useCases/ListBookmarkCreateOneUseCase';
import { ListBookmarkDeleteOneUseCase } from '@domain/list/useCases/ListBookmarkDeleteOneUseCase';
import { ListBookmarkGetAllUseCase } from '@domain/list/useCases/ListBookmarkGetAllUseCase';
import { ListBookmarkGetOneUseCase } from '@domain/list/useCases/ListBookmarkGetOneUseCase';
import { ListCreateOneUseCase } from '@domain/list/useCases/ListCreateOneUseCase';
import { ListDeleteOneUseCase } from '@domain/list/useCases/ListDeleteOneUseCase';
import { ListGetAllPublicUseCase } from '@domain/list/useCases/ListGetAllPublicUseCase';
import { ListGetOneUseCase } from '@domain/list/useCases/ListGetOneUseCase';
import { ListUpdateOneUseCase } from '@domain/list/useCases/ListUpdateOneUseCase';
import { ListUserCreateOneUseCase } from '@domain/list/useCases/ListUserCreateOneUseCase';
import { ListUserDeleteOneUseCase } from '@domain/list/useCases/ListUserDeleteOneUseCase';
import { ListUserGetAllUseCase } from '@domain/list/useCases/ListUserGetAllUseCase';
import { ListUserGetOneUseCase } from '@domain/list/useCases/ListUserGetOneUseCase';
import { ListUserUpdateOneUseCase } from '@domain/list/useCases/ListUserUpdateOneUseCase';
import { BookmarkRepo } from '@infrastructure/persistence/mySQL/repositories/BookmarkRepo';
import { ListRepo } from '@infrastructure/persistence/mySQL/repositories/ListRepo';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';
import { ListBookmarkCreateOneController } from '../controllers/ListBookmarkCreateOneController';
import { ListBookmarkDeleteOneController } from '../controllers/ListBookmarkDeleteOneController';
import { ListBookmarkGetAllController } from '../controllers/ListBookmarkGetAllController';
import { ListBookmarkGetOneController } from '../controllers/ListBookmarkGetOneController';
import { ListCreateOneController } from '../controllers/ListCreateOneController';
import { ListDeleteOneController } from '../controllers/ListDeleteOneController';
import { ListGetAllPublicController } from '../controllers/ListGetAllPublicController';
import { ListGetOneController } from '../controllers/ListGetOneController';
import { ListUpdateOneController } from '../controllers/ListUpdateOneController';
import { ListUserCreateOneController } from '../controllers/ListUserCreateOneController';
import { ListUserDeleteOneController } from '../controllers/ListUserDeleteOneController';
import { ListUserGetAllController } from '../controllers/ListUserGetAllController';
import { ListUserGetOneController } from '../controllers/ListUserGetOneController';
import { ListUserUpdateOneController } from '../controllers/ListUserUpdateOneController';

const ListsRoute = express.Router();

ListsRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listGetAllPublicUseCase = new ListGetAllPublicUseCase(listRepo);
  const listGetAllPublicController = new ListGetAllPublicController(listGetAllPublicUseCase);

  const response = await listGetAllPublicController.execute(req, res, next);

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

ListsRoute.delete('/:listId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listDeleteOneUseCase = new ListDeleteOneUseCase(listRepo);
  const listDeleteOneController = new ListDeleteOneController(listDeleteOneUseCase);

  const response = await listDeleteOneController.execute(req, res, next);

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
  const listUserUpdateOneUseCase = new ListUserUpdateOneUseCase(listRepo, userRepo);
  const listUserUpdateOneController = new ListUserUpdateOneController(listUserUpdateOneUseCase);

  const response = await listUserUpdateOneController.execute(req, res, next);

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
  const listBookmarksUseCase = new ListBookmarkGetAllUseCase(listRepo);
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

export { ListsRoute };
