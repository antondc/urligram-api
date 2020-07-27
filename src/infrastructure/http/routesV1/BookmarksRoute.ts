import express, { NextFunction, Request, Response } from 'express';

import { BookmarkGetAllPublicUseCase } from '@domain/bookmark/useCases/BookmarkGetAllPublicUseCase';
import { BookmarkGetOneUseCase } from '@domain/bookmark/useCases/BookmarkGetOneUseCase';
import { BookmarkListGetAllUseCase } from '@domain/bookmark/useCases/BookmarkListGetAllUseCase';
import { BookmarkTagGetAllUseCase } from '@domain/bookmark/useCases/BookmarkTagGetAllUseCase';
import { BookmarkGetAllPublicController } from '@infrastructure/http/controllers/BookmarkGetAllPublicController';
import { BookmarkGetOneController } from '@infrastructure/http/controllers/BookmarkGetOneController';
import { BookmarkRepo } from '@infrastructure/persistence/mySQL/repositories/BookmarkRepo';
import { BookmarkListGetAllController } from '../controllers/BookmarkListGetAllController';
import { BookmarkTagGetAllController } from '../controllers/BookmarkTagGetAllController';

const BookmarksRoute = express.Router();

BookmarksRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const bookmarkRepo = new BookmarkRepo();
  const bookmarkGetAllPublicUseCase = new BookmarkGetAllPublicUseCase(bookmarkRepo);
  const bookmarkGetAllPublicController = new BookmarkGetAllPublicController(bookmarkGetAllPublicUseCase);

  const response = await bookmarkGetAllPublicController.execute(req, res, next);

  return response;
});

BookmarksRoute.get('/:bookmarkId', async (req: Request, res: Response, next: NextFunction) => {
  const bookmarkRepo = new BookmarkRepo();
  const bookmarkGetOneUseCase = new BookmarkGetOneUseCase(bookmarkRepo);
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

export { BookmarksRoute };
