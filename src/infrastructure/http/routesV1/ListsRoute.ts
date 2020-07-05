import express, { NextFunction, Request, Response } from 'express';

import { ListCreateUseCase } from '@domain/list/useCases/ListCreateUseCase';
import { ListDeleteUseCase } from '@domain/list/useCases/ListDeleteUseCase';
import { ListGetAllUseCase } from '@domain/list/useCases/ListGetAllUseCase';
import { ListGetOneUseCase } from '@domain/list/useCases/ListGetOneUseCase';
import { ListLinkCreateUseCase } from '@domain/list/useCases/ListLinkCreateUseCase';
import { ListLinkDeleteUseCase } from '@domain/list/useCases/ListLinkDeleteUseCase';
import { ListLinkGetAllUseCase } from '@domain/list/useCases/ListLinkGetAllUseCase';
import { ListLinkGetOneUseCase } from '@domain/list/useCases/ListLinkGetOneUseCase';
import { ListUpdateUseCase } from '@domain/list/useCases/ListUpdateUseCase';
import { ListUserGetAllUseCase } from '@domain/list/useCases/ListUserGetAllUseCase';
import { ListCreateController } from '@infrastructure/http/controllers/ListCreateController';
import { ListDeleteController } from '@infrastructure/http/controllers/ListDeleteController';
import { ListGetAllController } from '@infrastructure/http/controllers/ListGetAllController';
import { ListGetOneController } from '@infrastructure/http/controllers/ListGetOneController';
import { ListLinkCreateController } from '@infrastructure/http/controllers/ListLinkCreateController';
import { ListLinkDeleteController } from '@infrastructure/http/controllers/ListLinkDeleteController';
import { ListLinkGetAllController } from '@infrastructure/http/controllers/ListLinkGetAllController';
import { ListLinkGetOneController } from '@infrastructure/http/controllers/ListLinkGetOneController';
import { ListUpdateController } from '@infrastructure/http/controllers/ListUpdateController';
import { ListUserGetAllController } from '@infrastructure/http/controllers/ListUserGetAllController';
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

export { ListsRoute };
