import express, { NextFunction, Request, Response } from 'express';

import { TagGetAllUseCase } from '@domain/tag/useCases/TagGetAllUseCase';
import { TagListGetAllPublicUseCase } from '@domain/tag/useCases/TagListGetAllPublicUseCase';
import { TagGetAllController } from '@infrastructure/http/controllers/TagGetAllController';
import { TagListGetAllPublicController } from '@infrastructure/http/controllers/TagListGetAllPublicController';
import { TagRepo } from '@infrastructure/persistence/mySQL/repositories/TagRepo';

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

export { TagsRoute };
