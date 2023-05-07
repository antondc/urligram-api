import express, { NextFunction, Request, Response } from 'express'; // eslint-disable-line @typescript-eslint/no-unused-vars

import { LinkGetAllUseCase } from '@domain/link/useCases/LinkGetAllUseCase';
import { LinkGetOneUseCase } from '@domain/link/useCases/LinkGetOneUseCase';
import { LinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { LinkListGetAllPublicUseCase } from '@domain/link/useCases/LinkListGetAllPublicUseCase';
import { LinkNotesGetAllPublicUseCase } from '@domain/link/useCases/LinkNotesGetAllPublicUseCase';
import { LinkRequestInfoUseCase } from '@domain/link/useCases/LinkRequestInfoUseCase';
import { LinkTagGetAllUseCase } from '@domain/link/useCases/LinkTagGetAllPublicUseCase';
import { LinkUsersGetAllUseCase } from '@domain/link/useCases/LinkUsersGetAllUseCase';
import { LinkVoteOneUseCase } from '@domain/link/useCases/LinkVoteOneUseCase';
import { LinkGetAllController } from '@infrastructure/http/controllers/LinkGetAllController';
import { LinkGetOneController } from '@infrastructure/http/controllers/LinkGetOneController';
import { LinkListGetAllPublicController } from '@infrastructure/http/controllers/LinkListGetAllPublicController';
import { LinkNotesGetAllController } from '@infrastructure/http/controllers/LinkNotesGetAllController';
import { LinkRequestInfoController } from '@infrastructure/http/controllers/LinkRequestInfoController';
import { LinkTagGetAllController } from '@infrastructure/http/controllers/LinkTagGetAllController';
import { LinkUsersGetAllController } from '@infrastructure/http/controllers/LinkUsersGetAllController';
import { LinkVoteOneController } from '@infrastructure/http/controllers/LinkVoteOneController';
import { BookmarkRepo } from '@infrastructure/persistence/mySQL/repositories/BookmarkRepo';
import { LinkRepo } from '@infrastructure/persistence/mySQL/repositories/LinkRepo';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';

const LinksRoute = express.Router({ mergeParams: true });

LinksRoute.get('/url', async (req: Request, res: Response, next: NextFunction) => {
  const linkRequestInfoUseCase = new LinkRequestInfoUseCase();
  const linkRequestInfoController = new LinkRequestInfoController(linkRequestInfoUseCase);

  const response = await linkRequestInfoController.execute(req, res, next);

  return response;
});

LinksRoute.get('/:linkId', async (req: Request, res: Response, next: NextFunction) => {
  const linkRepo = new LinkRepo();
  const bookmarkRepo = new BookmarkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo, bookmarkRepo);

  const linkGetOneUseCase = new LinkGetOneUseCase(linkRepo, linkGetStatisticsUseCase);
  const linkGetOneController = new LinkGetOneController(linkGetOneUseCase);

  const response = await linkGetOneController.execute(req, res, next);

  return response;
});

LinksRoute.put('/:linkId', async (req: Request, res: Response, next: NextFunction) => {
  const linkRepo = new LinkRepo();
  const bookmarkRepo = new BookmarkRepo();

  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo, bookmarkRepo);
  const linkGetOneUseCase = new LinkGetOneUseCase(linkRepo, linkGetStatisticsUseCase);
  const linkVoteOneUseCase = new LinkVoteOneUseCase(linkRepo, linkGetOneUseCase);
  const linkVoteOneController = new LinkVoteOneController(linkVoteOneUseCase);

  const response = await linkVoteOneController.execute(req, res, next);

  return response;
});

LinksRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const linkRepo = new LinkRepo();
  const bookmarkRepo = new BookmarkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo, bookmarkRepo);

  const linkGetAllUseCase = new LinkGetAllUseCase(linkRepo, linkGetStatisticsUseCase);
  const linkGetAllController = new LinkGetAllController(linkGetAllUseCase);

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

LinksRoute.get('/:linkId/notes', async (req: Request, res: Response, next: NextFunction) => {
  const linkRepo = new LinkRepo();
  const linkNotesGetAllUseCase = new LinkNotesGetAllPublicUseCase(linkRepo);
  const linkNotesGetAllController = new LinkNotesGetAllController(linkNotesGetAllUseCase);

  const response = await linkNotesGetAllController.execute(req, res, next);

  return response;
});

LinksRoute.get('/:linkId/users', async (req: Request, res: Response, next: NextFunction) => {
  const linkRepo = new LinkRepo();
  const userRepo = new UserRepo();
  const linkUsersGetAllUseCase = new LinkUsersGetAllUseCase(linkRepo, userRepo);
  const linkUsersGetAllController = new LinkUsersGetAllController(linkUsersGetAllUseCase);

  const response = await linkUsersGetAllController.execute(req, res, next);

  return response;
});

export { LinksRoute };
