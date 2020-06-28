import express, { NextFunction, Request, Response } from 'express';

import { GetLanguageBySlugUseCase } from '@domain/language/useCases/GetLanguageBySlugUseCase';
import { LanguageGetAllUseCase } from '@domain/language/useCases/LanguageGetAllUseCase';
import { GetLanguageBySlugController } from '@infrastructure/http/controllers/GetLanguageBySlugController';
import { LanguageGetAllController } from '@infrastructure/http/controllers/LanguageGetAllController';
import { getLanguagesRepo } from '@infrastructure/persistence/mySQL/repositories/LanguagesRepo';

const LanguagesRoute = express.Router();

LanguagesRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const languagesRepo = new getLanguagesRepo();
  const languageGetAllUseCase = new LanguageGetAllUseCase(languagesRepo);
  const languageGetAllController = new LanguageGetAllController(languageGetAllUseCase);

  const response = await languageGetAllController.execute(req, res, next);

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
