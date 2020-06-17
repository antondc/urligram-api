import express, { Request, Response, NextFunction } from 'express';
import { GetLanguagesAdapter } from '@infrastructure/http/adapters/GetLanguagesAdapter';
import { GetLanguagesUseCase } from '@domain/language/useCases/GetLanguagesUseCase';
import { GetLanguagesRepo } from '@infrastructure/persistence/mySQL/repositories/GetLanguagesRepo';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getLanguagesRepo = new GetLanguagesRepo();
    const loginUserUseCase = new GetLanguagesUseCase(getLanguagesRepo);
    const loginUserAdapter = new GetLanguagesAdapter(loginUserUseCase);

    const response = await loginUserAdapter.get();

    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

export default router;
