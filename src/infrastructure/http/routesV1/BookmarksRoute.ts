import express, { NextFunction, Request, Response } from 'express';

import { BookmarkGetAllPublicUseCase } from '@domain/bookmark/useCases/BookmarkGetAllPublicUseCase';
import { BookmarkGetByIdsUseCase } from '@domain/bookmark/useCases/BookmarkGetByIdsUseCase';
import { BookmarkGetOneByLinkUserUseCase } from '@domain/bookmark/useCases/BookmarkGetOneByLinkUserUseCase';
import { BookmarkGetOneUseCase } from '@domain/bookmark/useCases/BookmarkGetOneUseCase';
import { BookmarkListGetAllUseCase } from '@domain/bookmark/useCases/BookmarkListGetAllUseCase';
import { BookmarkTagGetAllUseCase } from '@domain/bookmark/useCases/BookmarkTagGetAllUseCase';
import { LinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { BookmarkGetAllPublicController } from '@infrastructure/http/controllers/BookmarkGetAllPublicController';
import { BookmarkGetByIdsController } from '@infrastructure/http/controllers/BookmarkGetByIdsController';
import { BookmarkGetByLinkIdAndUserIdController } from '@infrastructure/http/controllers/BookmarkGetOneByLinkUserController';
import { BookmarkGetOneController } from '@infrastructure/http/controllers/BookmarkGetOneController';
import { BookmarkListGetAllController } from '@infrastructure/http/controllers/BookmarkListGetAllController';
import { BookmarkTagGetAllController } from '@infrastructure/http/controllers/BookmarkTagGetAllController';
import { BookmarkRepo } from '@infrastructure/persistence/mySQL/repositories/BookmarkRepo';
import { LinkRepo } from '@infrastructure/persistence/mySQL/repositories/LinkRepo';

const BookmarksRoute = express.Router();

BookmarksRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const bookmarkRepo = new BookmarkRepo();
  const linkRepo = new LinkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo, bookmarkRepo);
  const bookmarkGetAllPublicUseCase = new BookmarkGetAllPublicUseCase(bookmarkRepo, linkGetStatisticsUseCase);
  const bookmarkGetAllPublicController = new BookmarkGetAllPublicController(bookmarkGetAllPublicUseCase);

  const response = await bookmarkGetAllPublicController.execute(req, res, next);

  return response;
});

BookmarksRoute.get('/ids', async (req: Request, res: Response, next: NextFunction) => {
  const bookmarkRepo = new BookmarkRepo();
  const linkRepo = new LinkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo, bookmarkRepo);
  const bookmarkGetByIdsUseCase = new BookmarkGetByIdsUseCase(bookmarkRepo, linkGetStatisticsUseCase);
  const bookmarkGetByIdsController = new BookmarkGetByIdsController(bookmarkGetByIdsUseCase);

  const response = await bookmarkGetByIdsController.execute(req, res, next);

  return response;
});

BookmarksRoute.get('/:bookmarkId', async (req: Request, res: Response, next: NextFunction) => {
  const bookmarkRepo = new BookmarkRepo();
  const linkRepo = new LinkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo, bookmarkRepo);

  const bookmarkGetOneUseCase = new BookmarkGetOneUseCase(bookmarkRepo, linkGetStatisticsUseCase);
  const bookmarkGetOneController = new BookmarkGetOneController(bookmarkGetOneUseCase);

  const response = await bookmarkGetOneController.execute(req, res, next);

  return response;
});

BookmarksRoute.get('/:bookmarkId/tags', async (req: Request, res: Response, next: NextFunction) => {
  const bookmarkRepo = new BookmarkRepo();
  const bookmarkTagGetAllUseCase = new BookmarkTagGetAllUseCase(bookmarkRepo);
  const bookmarkTagGetAllController = new BookmarkTagGetAllController(bookmarkTagGetAllUseCase);

  const response = await bookmarkTagGetAllController.execute(req, res, next);

  return response;
});

BookmarksRoute.get('/:bookmarkId/lists', async (req: Request, res: Response, next: NextFunction) => {
  const bookmarkRepo = new BookmarkRepo();
  const bookmarkListGetAllUseCase = new BookmarkListGetAllUseCase(bookmarkRepo);
  const bookmarkListGetAllController = new BookmarkListGetAllController(bookmarkListGetAllUseCase);

  const response = await bookmarkListGetAllController.execute(req, res, next);

  return response;
});

BookmarksRoute.get('/link/:linkId/user/me', async (req: Request, res: Response, next: NextFunction) => {
  const bookmarkRepo = new BookmarkRepo();
  const linkRepo = new LinkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo, bookmarkRepo);
  const bookmarkGetOneByLinkUserUseCase = new BookmarkGetOneByLinkUserUseCase(bookmarkRepo, linkGetStatisticsUseCase);
  const bookmarkGetOneByLinkUserController = new BookmarkGetByLinkIdAndUserIdController(bookmarkGetOneByLinkUserUseCase);

  const response = await bookmarkGetOneByLinkUserController.execute(req, res, next);

  return response;
});

export { BookmarksRoute };
