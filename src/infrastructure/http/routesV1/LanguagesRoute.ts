import express, { NextFunction, Request, Response } from 'express';

import { LanguageGetAllUseCase } from '@domain/language/useCases/LanguageGetAllUseCase';
import { LanguageGetOneUseCase } from '@domain/language/useCases/LanguageGetOneUseCase';
import { LanguageGetAllController } from '@infrastructure/http/controllers/LanguageGetAllController';
import { LanguageGetOneController } from '@infrastructure/http/controllers/LanguageGetOneController';
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
  const languageGetOneUseCase = new LanguageGetOneUseCase(languagesRepo);
  const languageGetOneController = new LanguageGetOneController(languageGetOneUseCase);

  const response = await languageGetOneController.execute(req, res, next);

  return response;
});

export { LanguagesRoute };
