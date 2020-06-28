import express, { NextFunction, Request, Response } from 'express';

import { LinkGetAllUseCase } from '@domain/link/useCases/LinkGetAllUseCase';
import { LinkGetOneUseCase } from '@domain/link/useCases/LinkGetOneUseCase';
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

export { LinksRoute };
