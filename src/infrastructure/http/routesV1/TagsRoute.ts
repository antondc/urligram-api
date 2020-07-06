import express, { NextFunction, Request, Response } from 'express';

import { TagGetAllUseCase } from '@domain/tag/useCases/TagGetAllUseCase';
import { TagGetOneUseCase } from '@domain/tag/useCases/TagGetOneUseCase';
import { TagLinkGetAllUseCase } from '@domain/tag/useCases/TagLinkGetAllUseCase';
import { TagListGetAllUseCase } from '@domain/tag/useCases/TagListGetAllUseCase';
import { TagGetAllController } from '@infrastructure/http/controllers/TagGetAllController';
import { TagGetOneController } from '@infrastructure/http/controllers/TagGetOneController';
import { TagLinkGetAllController } from '@infrastructure/http/controllers/TagLinkGetAllController';
import { TagListGetAllController } from '@infrastructure/http/controllers/TagListGetAllController';
import { TagRepo } from '@infrastructure/persistence/mySQL/repositories/TagRepo';

const TagsRoute = express.Router();

TagsRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const tagRepo = new TagRepo();
  const tagGetAllUseCase = new TagGetAllUseCase(tagRepo);
  const tagGetAllController = new TagGetAllController(tagGetAllUseCase);

  const response = await tagGetAllController.execute(req, res, next);

  return response;
});

TagsRoute.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const tagRepo = new TagRepo();
  const tagGetOneUseCase = new TagGetOneUseCase(tagRepo);
  const tagGetOneController = new TagGetOneController(tagGetOneUseCase);

  const response = await tagGetOneController.execute(req, res, next);

  return response;
});

TagsRoute.get('/:id/links', async (req: Request, res: Response, next: NextFunction) => {
  const tagRepo = new TagRepo();
  const tagLinkGetOneUseCase = new TagLinkGetAllUseCase(tagRepo);
  const tagLinkGetOneController = new TagLinkGetAllController(tagLinkGetOneUseCase);

  const response = await tagLinkGetOneController.execute(req, res, next);

  return response;
});

TagsRoute.get('/:id/lists', async (req: Request, res: Response, next: NextFunction) => {
  const tagRepo = new TagRepo();
  const tagListGetOneUseCase = new TagListGetAllUseCase(tagRepo);
  const tagListGetOneController = new TagListGetAllController(tagListGetOneUseCase);

  const response = await tagListGetOneController.execute(req, res, next);

  return response;
});

export { TagsRoute };
