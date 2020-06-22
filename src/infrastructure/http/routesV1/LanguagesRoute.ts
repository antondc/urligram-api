import express, { NextFunction, Request, Response } from 'express';

import { GetLanguageBySlugUseCase } from '@domain/language/useCases/GetLanguageBySlugUseCase';
import { GetLanguagesUseCase } from '@domain/language/useCases/GetLanguagesUseCase';
import {
    GetLanguageBySlugController
} from '@infrastructure/http/controllers/GetLanguageBySlugController';
import { GetLanguagesController } from '@infrastructure/http/controllers/GetLanguagesController';
import { getLanguagesRepo } from '@infrastructure/persistence/mySQL/repositories/LanguagesRepo';

const LanguagesRoute = express.Router();

LanguagesRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const languagesRepo = new getLanguagesRepo();
  const getLanguagesUseCase = new GetLanguagesUseCase(languagesRepo);
  const getLanguagesController = new GetLanguagesController(getLanguagesUseCase);

  const response = await getLanguagesController.execute(req, res, next);

  return response;
});

LanguagesRoute.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  const languagesRepo = new getLanguagesRepo();
  const getLanguageBySlug = new GetLanguageBySlugUseCase(languagesRepo);
  const getLanguageBySlugController = new GetLanguageBySlugController(getLanguageBySlug);

  const response = await getLanguageBySlugController.execute(req, res, next);

  return response;
});

export { LanguagesRoute };
