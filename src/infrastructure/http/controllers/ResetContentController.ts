import express, { Request, Response } from 'express';
import { ResetContentAdapter } from '@adapter/ResetContentAdapter';
import { ResetContentRepo } from '@infrastructure/persistence/mySQL/repositories/ResetContentRepo';
import { ResetContentUseCase } from '@domain/persistence/useCases/ResetContentUseCase';

const router = express.Router();

router.delete('/', async (req: Request, res: Response) => {
  const resetContentRepo = new ResetContentRepo();
  const resetContentUseCase = new ResetContentUseCase(resetContentRepo);
  const resetContentAdapter = new ResetContentAdapter(resetContentUseCase);

  const response = await resetContentAdapter.resetContent();

  return res.status(200).send(response);
});

export default router;
