import express, { NextFunction, Request, Response } from 'express';

import { BookmarkGetOneUseCase } from '@domain/bookmark/useCases/BookmarkGetOneUseCase';
import { BookmarkRepo } from '@infrastructure/persistence/mySQL/repositories/BookmarkRepo';
import { BookmarkGetOneController } from '../controllers/BookmarkGetOneController';

const BookmarksRoute = express.Router();

BookmarksRoute.get('/:bookmarkId', async (req: Request, res: Response, next: NextFunction) => {
  const bookmarkRepo = new BookmarkRepo();
  const bookmarkGetOneUseCase = new BookmarkGetOneUseCase(bookmarkRepo);
  const bookmarkGetOneController = new BookmarkGetOneController(bookmarkGetOneUseCase);

  const response = await bookmarkGetOneController.execute(req, res, next);

  return response;
});

export { BookmarksRoute };
