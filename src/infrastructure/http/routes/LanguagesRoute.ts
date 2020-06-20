import express, { Request, Response, NextFunction } from 'express';
import { GetLanguagesAdapter } from '@infrastructure/http/adapters/GetLanguagesAdapter';
import { GetLanguagesUseCase } from '@domain/language/useCases/GetLanguagesUseCase';
import { GetLanguagesRepo } from '@infrastructure/persistence/mySQL/repositories/GetLanguagesRepo';
import { IGetLanguageRequestDTO } from '@domain/language/dto/IGetLanguageRequestDTO';
import { GetLanguageBySlugUseCase } from '@domain/language/useCases/GetLanguageBySlugUseCase';
import { GetLanguageBySlugAdapter } from '../adapters/GetLanguageBySlugAdapter';

const LanguagesRoute = express.Router();

LanguagesRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getLanguagesRepo = new GetLanguagesRepo();
    const getLanguagesUseCase = new GetLanguagesUseCase(getLanguagesRepo);
    const getLanguagesAdapter = new GetLanguagesAdapter(getLanguagesUseCase);

    const response = await getLanguagesAdapter.getAll();

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
    const getLanguageBySlugAdapter = new GetLanguageBySlugAdapter(getLanguageBySlug);

    const response = await getLanguageBySlugAdapter.getOne();

    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

export { LanguagesRoute };
