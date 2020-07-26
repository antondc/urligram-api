import express, { NextFunction, Request, Response } from 'express';

import { TagGetAllUseCase } from '@domain/tag/useCases/TagGetAllUseCase';
import { TagRepo } from '@infrastructure/persistence/mySQL/repositories/TagRepo';
import { TagGetAllController } from '../controllers/TagGetAllController';

const TagsRoute = express.Router();

TagsRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const tagRepo = new TagRepo();
  const tagGetAllUseCase = new TagGetAllUseCase(tagRepo);
  const tagGetAllController = new TagGetAllController(tagGetAllUseCase);

  const response = await tagGetAllController.execute(req, res, next);

  return response;
});

export { TagsRoute };
