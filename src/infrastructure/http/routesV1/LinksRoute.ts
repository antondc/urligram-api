import express, { NextFunction, Request, Response } from 'express';

import { LinkGetOneUseCase } from '@domain/link/useCases/LinkGetOneUseCase';
import { LinkGetOneController } from '@infrastructure/http/controllers/LinkGetOneController';
import { LinkRepo } from '@infrastructure/persistence/mySQL/repositories/LinkRepo';

const LinksRoute = express.Router();

LinksRoute.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new LinkRepo();
  const linkGetOneUseCase = new LinkGetOneUseCase(userRepo);
  const linkGetOneController = new LinkGetOneController(linkGetOneUseCase);

  const response = await linkGetOneController.execute(req, res, next);

  return response;
});

export { LinksRoute };
