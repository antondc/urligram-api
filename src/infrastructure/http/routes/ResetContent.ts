import express, { Request, Response } from 'express';
import { ResetContentController } from '@adapter/ResetContentController';
import { ResetContentRepo } from '@infrastructure/persistence/mySQL/repositories/ResetContentRepo';
import { ResetContentUseCase } from '@application/ResetContentUseCase';

const router = express.Router();

router.delete('/', async (req: Request, res: Response) => {
  const resetContentRepo = new ResetContentRepo();
  const resetContentUseCase = new ResetContentUseCase(resetContentRepo);
  const resetContentController = new ResetContentController(resetContentUseCase);

  const response = await resetContentController.resetContent();

  return res.status(200).send(response);
});

export default router;
