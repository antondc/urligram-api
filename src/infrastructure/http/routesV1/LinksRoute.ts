import express, { NextFunction, Request, Response } from 'express';

import { LinkCreateUseCase } from '@domain/link/useCases/LinkCreateUseCase';
import { LinkDeleteUseCase } from '@domain/link/useCases/LinkDeleteUseCase';
import { LinkGetAllUseCase } from '@domain/link/useCases/LinkGetAllUseCase';
import { LinkGetOneUseCase } from '@domain/link/useCases/LinkGetOneUseCase';
import { LinkCreateController } from '@infrastructure/http/controllers/LinkCreateController';
import { LinkDeleteController } from '@infrastructure/http/controllers/LinkDeleteController';
import { LinkGetAllController } from '@infrastructure/http/controllers/LinkGetAllController';
import { LinkGetOneController } from '@infrastructure/http/controllers/LinkGetOneController';
import { LinkRepo } from '@infrastructure/persistence/mySQL/repositories/LinkRepo';

const LinksRoute = express.Router();

LinksRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new LinkRepo();
  const linkGetAllUseCase = new LinkGetAllUseCase(userRepo);
  const linkGetAllController = new LinkGetAllController(linkGetAllUseCase);

  const response = await linkGetAllController.execute(req, res, next);

  return response;
});

LinksRoute.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new LinkRepo();
  const linkGetOneUseCase = new LinkGetOneUseCase(userRepo);
  const linkGetOneController = new LinkGetOneController(linkGetOneUseCase);

  const response = await linkGetOneController.execute(req, res, next);

  return response;
});

LinksRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new LinkRepo();
  const linkCreateUseCase = new LinkCreateUseCase(userRepo);
  const linkCreateController = new LinkCreateController(linkCreateUseCase);

  const response = await linkCreateController.execute(req, res, next);

  return response;
});

LinksRoute.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new LinkRepo();
  const linkDeleteUseCase = new LinkDeleteUseCase(userRepo);
  const linkDeleteController = new LinkDeleteController(linkDeleteUseCase);

  const response = await linkDeleteController.execute(req, res, next);

  return response;
});

export { LinksRoute };
