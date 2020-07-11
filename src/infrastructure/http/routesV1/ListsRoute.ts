import express, { NextFunction, Request, Response } from 'express';

import { ListCreateUseCase } from '@domain/list/useCases/ListCreateUseCase';
import { ListDeleteUseCase } from '@domain/list/useCases/ListDeleteUseCase';
import { ListGetAllUseCase } from '@domain/list/useCases/ListGetAllUseCase';
import { ListGetOneUseCase } from '@domain/list/useCases/ListGetOneUseCase';
import { ListLinkCreateUseCase } from '@domain/list/useCases/ListLinkCreateUseCase';
import { ListLinkDeleteUseCase } from '@domain/list/useCases/ListLinkDeleteUseCase';
import { ListLinkGetAllUseCase } from '@domain/list/useCases/ListLinkGetAllUseCase';
import { ListLinkGetOneUseCase } from '@domain/list/useCases/ListLinkGetOneUseCase';
import { ListTagGetAllUseCase } from '@domain/list/useCases/ListTagGetAllUseCase';
import { ListUpdateUseCase } from '@domain/list/useCases/ListUpdateUseCase';
import { ListUserCreateUseCase } from '@domain/list/useCases/ListUserCreateUseCase';
import { ListUserDeleteUseCase } from '@domain/list/useCases/ListUserDeleteUseCase';
import { ListUserGetAllUseCase } from '@domain/list/useCases/ListUserGetAllUseCase';
import { ListUserGetOneUseCase } from '@domain/list/useCases/ListUserGetOneUseCase';
import { ListUserUpdateUseCase } from '@domain/list/useCases/ListUserUpdateUseCase';
import { ListCreateController } from '@infrastructure/http/controllers/ListCreateController';
import { ListDeleteController } from '@infrastructure/http/controllers/ListDeleteController';
import { ListGetAllController } from '@infrastructure/http/controllers/ListGetAllController';
import { ListGetOneController } from '@infrastructure/http/controllers/ListGetOneController';
import { ListLinkCreateController } from '@infrastructure/http/controllers/ListLinkCreateController';
import { ListLinkDeleteController } from '@infrastructure/http/controllers/ListLinkDeleteController';
import { ListLinkGetAllController } from '@infrastructure/http/controllers/ListLinkGetAllController';
import { ListLinkGetOneController } from '@infrastructure/http/controllers/ListLinkGetOneController';
import { ListTagGetAllController } from '@infrastructure/http/controllers/ListTagGetAllController';
import { ListUpdateController } from '@infrastructure/http/controllers/ListUpdateController';
import { ListUserCreateController } from '@infrastructure/http/controllers/ListUserCreateController';
import { ListUserDeleteController } from '@infrastructure/http/controllers/ListUserDeleteController';
import { ListUserGetAllController } from '@infrastructure/http/controllers/ListUserGetAllController';
import { ListUserGetOneController } from '@infrastructure/http/controllers/ListUserGetOneController';
import { ListUserUpdateController } from '@infrastructure/http/controllers/ListUserUpdateController';
import { LinkRepo } from '@infrastructure/persistence/mySQL/repositories/LinkRepo';
import { ListRepo } from '@infrastructure/persistence/mySQL/repositories/ListRepo';

const ListsRoute = express.Router();

ListsRoute.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listGetOneUseCase = new ListGetOneUseCase(listRepo);
  const listGetOneController = new ListGetOneController(listGetOneUseCase);

  const response = await listGetOneController.execute(req, res, next);

  return response;
});

ListsRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listGetAllUseCase = new ListGetAllUseCase(listRepo);
  const listGetAllController = new ListGetAllController(listGetAllUseCase);

  const response = await listGetAllController.execute(req, res, next);

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

ListsRoute.get('/:id/links/:linkId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listLinkGetOneUseCase = new ListLinkGetOneUseCase(listRepo);
  const listLinkGetOneController = new ListLinkGetOneController(listLinkGetOneUseCase);

  const response = await listLinkGetOneController.execute(req, res, next);

  return response;
});

ListsRoute.get('/:id/links/', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listLinkGetAllUseCase = new ListLinkGetAllUseCase(listRepo);
  const listLinkGetAllController = new ListLinkGetAllController(listLinkGetAllUseCase);

  const response = await listLinkGetAllController.execute(req, res, next);

  return response;
});

ListsRoute.post('/:id/links/:linkId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const linkRepo = new LinkRepo();
  const listLinkCreateUseCase = new ListLinkCreateUseCase(listRepo, linkRepo);
  const listLinkCreateController = new ListLinkCreateController(listLinkCreateUseCase);

  const response = await listLinkCreateController.execute(req, res, next);

  return response;
});

ListsRoute.delete('/:id/links/:linkId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listLinkDeleteUseCase = new ListLinkDeleteUseCase(listRepo);
  const listLinkDeleteController = new ListLinkDeleteController(listLinkDeleteUseCase);

  const response = await listLinkDeleteController.execute(req, res, next);

  return response;
});

ListsRoute.get('/:id/users/', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listUsersGetAllUseCase = new ListUserGetAllUseCase(listRepo);
  const listUsersGetAllController = new ListUserGetAllController(listUsersGetAllUseCase);

  const response = await listUsersGetAllController.execute(req, res, next);

  return response;
});

ListsRoute.get('/:id/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listUsersGetOneUseCase = new ListUserGetOneUseCase(listRepo);
  const listUsersGetOneController = new ListUserGetOneController(listUsersGetOneUseCase);

  const response = await listUsersGetOneController.execute(req, res, next);

  return response;
});

ListsRoute.put('/:id/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listUsersUpdateUseCase = new ListUserUpdateUseCase(listRepo);
  const listUsersUpdateController = new ListUserUpdateController(listUsersUpdateUseCase);

  const response = await listUsersUpdateController.execute(req, res, next);

  return response;
});

ListsRoute.post('/:id/users/me', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listUsersCreateUseCase = new ListUserCreateUseCase(listRepo);
  const listUsersCreateController = new ListUserCreateController(listUsersCreateUseCase);

  const response = await listUsersCreateController.execute(req, res, next);

  return response;
});

ListsRoute.delete('/:id/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listUsersDeleteUseCase = new ListUserDeleteUseCase(listRepo);
  const listUsersDeleteController = new ListUserDeleteController(listUsersDeleteUseCase);

  const response = await listUsersDeleteController.execute(req, res, next);

  return response;
});

ListsRoute.get('/:id/tags/', async (req: Request, res: Response, next: NextFunction) => {
  const listRepo = new ListRepo();
  const listTagGetAllUseCase = new ListTagGetAllUseCase(listRepo);
  const listTagGetAllController = new ListTagGetAllController(listTagGetAllUseCase);

  const response = await listTagGetAllController.execute(req, res, next);

  return response;
});

export { ListsRoute };
