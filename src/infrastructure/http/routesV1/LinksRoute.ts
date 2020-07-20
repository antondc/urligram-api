import express, { NextFunction, Request, Response } from 'express'; // eslint-disable-line @typescript-eslint/no-unused-vars

import { LinkGetAllUseCase } from '@domain/link/useCases/LinkGetAllUseCase';
import { LinkGetOneUseCase } from '@domain/link/useCases/LinkGetOneUseCase';
import { LinkListGetAllUseCase } from '@domain/link/useCases/LinkListGetAllUseCase';
import { LinkTagGetAllUseCase } from '@domain/link/useCases/LinkTagGetAllUseCase';
import { LinkRepo } from '@infrastructure/persistence/mySQL/repositories/LinkRepo';
import { LinkGetAllController } from '../controllers/LinkGetAllController';
import { LinkGetOneController } from '../controllers/LinkGetOneController';
import { LinkListGetAllController } from '../controllers/LinkListGetAllController';
import { LinkTagGetAllController } from '../controllers/LinkTagGetAllController';

const LinksRoute = express.Router();

LinksRoute.get('/:linkId', async (req: Request, res: Response, next: NextFunction) => {
  const linkRepo = new LinkRepo();
  const linkGetOneUseCase = new LinkGetOneUseCase(linkRepo);
  const linkGetOneController = new LinkGetOneController(linkGetOneUseCase);

  const response = await linkGetOneController.execute(req, res, next);

  return response;
});

LinksRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new LinkRepo();
  const linkGetAllUseCase = new LinkGetAllUseCase(userRepo);
  const linkGetAllController = new LinkGetAllController(linkGetAllUseCase);

  const response = await linkGetAllController.execute(req, res, next);

  return response;
});

LinksRoute.get('/:linkId/lists', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new LinkRepo();
  const linkListGetAllUseCase = new LinkListGetAllUseCase(userRepo);
  const linkListGetAllController = new LinkListGetAllController(linkListGetAllUseCase);

  const response = await linkListGetAllController.execute(req, res, next);

  return response;
});

LinksRoute.get('/:id/tags', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new LinkRepo();
  const linkTagGetAllUseCase = new LinkTagGetAllUseCase(userRepo);
  const linkTagGetAllController = new LinkTagGetAllController(linkTagGetAllUseCase);

  const response = await linkTagGetAllController.execute(req, res, next);

  return response;
});

export { LinksRoute };
