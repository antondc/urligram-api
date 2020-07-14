import express, { NextFunction, Request, Response } from 'express'; // eslint-disable-line @typescript-eslint/no-unused-vars

import { LanguageGetOneUseCase } from '@domain/language/useCases/LanguageGetOneUseCase';
import { LanguageGetOneController } from '@infrastructure/http/controllers/LanguageGetOneController';
import { LanguageRepo } from '@infrastructure/persistence/mySQL/repositories/LanguageRepo';

const LanguagesRoute = express.Router();

LanguagesRoute.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  const languageRepo = new LanguageRepo();
  const languageGetOneUseCase = new LanguageGetOneUseCase(languageRepo);
  const languageGetOneController = new LanguageGetOneController(languageGetOneUseCase);

  const response = await languageGetOneController.execute(req, res, next);

  return response;
});

export { LanguagesRoute };
