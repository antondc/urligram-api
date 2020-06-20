import express, { Request, Response, NextFunction } from 'express';
import { GetLanguagesController } from '@infrastructure/http/controllers/GetLanguagesController';
import { GetLanguagesUseCase } from '@domain/language/useCases/GetLanguagesUseCase';
import { GetLanguagesRepo } from '@infrastructure/persistence/mySQL/repositories/GetLanguagesRepo';
import { IGetLanguageRequestDTO } from '@domain/language/dto/IGetLanguageRequestDTO';
import { GetLanguageBySlugUseCase } from '@domain/language/useCases/GetLanguageBySlugUseCase';
import { GetLanguageBySlugController } from '../controllers/GetLanguageBySlugController';

const LanguagesRoute = express.Router();

LanguagesRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getLanguagesRepo = new GetLanguagesRepo();
    const getLanguagesUseCase = new GetLanguagesUseCase(getLanguagesRepo);
    const getLanguagesController = new GetLanguagesController(getLanguagesUseCase);

    const response = await getLanguagesController.getAll();

    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

LanguagesRoute.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const getLanguagesRepo = new GetLanguagesRepo();
    const getLanguageBySlug = new GetLanguageBySlugUseCase(getLanguagesRepo, { slug });
    const getLanguageBySlugController = new GetLanguageBySlugController(getLanguageBySlug);

    const response = await getLanguageBySlugController.getOne();

    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

export { LanguagesRoute };
