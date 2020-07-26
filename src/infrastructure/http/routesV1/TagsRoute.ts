import express, { NextFunction, Request, Response } from 'express';

import { TagBookmarkGetAllPublicUseCase } from '@domain/tag/useCases/TagBookmarkGetAllPublicUseCase';
import { TagGetAllUseCase } from '@domain/tag/useCases/TagGetAllUseCase';
import { TagListGetAllPublicUseCase } from '@domain/tag/useCases/TagListGetAllPublicUseCase';
import { TagUserGetAllPublicUseCase } from '@domain/tag/useCases/TagUserGetAllPublicUseCase';
import { TagGetAllController } from '@infrastructure/http/controllers/TagGetAllController';
import { TagListGetAllPublicController } from '@infrastructure/http/controllers/TagListGetAllPublicController';
import { TagRepo } from '@infrastructure/persistence/mySQL/repositories/TagRepo';
import { TagBookmarkGetAllPublicController } from '../controllers/TagBookmarkGetAllPublicController';
import { TagUserGetAllPublicController } from '../controllers/TagUserGetAllPublicController';

const TagsRoute = express.Router();

TagsRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const tagRepo = new TagRepo();
  const tagGetAllUseCase = new TagGetAllUseCase(tagRepo);
  const tagGetAllController = new TagGetAllController(tagGetAllUseCase);

  const response = await tagGetAllController.execute(req, res, next);

  return response;
});

TagsRoute.get('/:tagId/lists', async (req: Request, res: Response, next: NextFunction) => {
  const tagRepo = new TagRepo();
  const tagListGetAllPublicUseCase = new TagListGetAllPublicUseCase(tagRepo);
  const tagListGetAllPublicController = new TagListGetAllPublicController(tagListGetAllPublicUseCase);

  const response = await tagListGetAllPublicController.execute(req, res, next);

  return response;
});

TagsRoute.get('/:tagId/bookmarks', async (req: Request, res: Response, next: NextFunction) => {
  const tagRepo = new TagRepo();
  const tagBookmarkGetAllPublicUseCase = new TagBookmarkGetAllPublicUseCase(tagRepo);
  const tagBookmarkGetAllPublicController = new TagBookmarkGetAllPublicController(tagBookmarkGetAllPublicUseCase);

  const response = await tagBookmarkGetAllPublicController.execute(req, res, next);

  return response;
});

TagsRoute.get('/:tagId/users', async (req: Request, res: Response, next: NextFunction) => {
  const tagRepo = new TagRepo();
  const tagUserGetAllPublicUseCase = new TagUserGetAllPublicUseCase(tagRepo);
  const tagUserGetAllPublicController = new TagUserGetAllPublicController(tagUserGetAllPublicUseCase);

  const response = await tagUserGetAllPublicController.execute(req, res, next);

  return response;
});

export { TagsRoute };
