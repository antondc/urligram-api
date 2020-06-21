import express, { Request, Response, NextFunction } from 'express';
import { GetLanguagesController } from '@infrastructure/http/controllers/GetLanguagesController';
import { GetLanguagesUseCase } from '@domain/language/useCases/GetLanguagesUseCase';
import { getLanguagesRepo } from '@infrastructure/persistence/mySQL/repositories/LanguagesRepo';
import { GetLanguageBySlugUseCase } from '@domain/language/useCases/GetLanguageBySlugUseCase';
import { GetLanguageBySlugController } from '../controllers/GetLanguageBySlugController';

const LanguagesRoute = express.Router();

LanguagesRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const languagesRepo = new getLanguagesRepo();
    const getLanguagesUseCase = new GetLanguagesUseCase(languagesRepo);
    const getLanguagesController = new GetLanguagesController(getLanguagesUseCase);

    const response = await getLanguagesController.execute();

    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

LanguagesRoute.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const languagesRepo = new getLanguagesRepo();
    const getLanguageBySlug = new GetLanguageBySlugUseCase(languagesRepo);
    const getLanguageBySlugController = new GetLanguageBySlugController(getLanguageBySlug);

    const response = await getLanguageBySlugController.execute({ slug });

    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

export { LanguagesRoute };
