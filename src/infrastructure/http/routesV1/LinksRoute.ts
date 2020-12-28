import express, { NextFunction, Request, Response } from 'express'; // eslint-disable-line @typescript-eslint/no-unused-vars

import { LinkGetAllPublicUseCase } from '@domain/link/useCases/LinkGetAllPublicUseCase';
import { LinkGetOneUseCase } from '@domain/link/useCases/LinkGetOneUseCase';
import { LinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { LinkListGetAllPublicUseCase } from '@domain/link/useCases/LinkListGetAllPublicUseCase';
import { LinkTagGetAllUseCase } from '@domain/link/useCases/LinkTagGetAllPublicUseCase';
import { LinkRepo } from '@infrastructure/persistence/mySQL/repositories/LinkRepo';
import { LinkGetAllPublicController } from '../controllers/LinkGetAllPublicController';
import { LinkGetOneController } from '../controllers/LinkGetOneController';
import { LinkListGetAllPublicController } from '../controllers/LinkListGetAllPublicController';
import { LinkTagGetAllController } from '../controllers/LinkTagGetAllController';

const LinksRoute = express.Router();

LinksRoute.get('/:linkId', async (req: Request, res: Response, next: NextFunction) => {
  const linkRepo = new LinkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo);

  const linkGetOneUseCase = new LinkGetOneUseCase(linkRepo, linkGetStatisticsUseCase);
  const linkGetOneController = new LinkGetOneController(linkGetOneUseCase);

  const response = await linkGetOneController.execute(req, res, next);

  return response;
});

LinksRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const linkRepo = new LinkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo);

  const linkGetAllUseCase = new LinkGetAllPublicUseCase(linkRepo, linkGetStatisticsUseCase);
  const linkGetAllController = new LinkGetAllPublicController(linkGetAllUseCase);

  const response = await linkGetAllController.execute(req, res, next);

  return response;
});

LinksRoute.get('/:linkId/lists', async (req: Request, res: Response, next: NextFunction) => {
  const linkRepo = new LinkRepo();
  const linkListGetAllPublicUseCase = new LinkListGetAllPublicUseCase(linkRepo);
  const linkListGetAllPublicController = new LinkListGetAllPublicController(linkListGetAllPublicUseCase);

  const response = await linkListGetAllPublicController.execute(req, res, next);

  return response;
});

LinksRoute.get('/:linkId/tags', async (req: Request, res: Response, next: NextFunction) => {
  const linkRepo = new LinkRepo();
  const linkTagGetAllUseCase = new LinkTagGetAllUseCase(linkRepo);
  const linkTagGetAllController = new LinkTagGetAllController(linkTagGetAllUseCase);

  const response = await linkTagGetAllController.execute(req, res, next);

  return response;
});

export { LinksRoute };
