import express, { NextFunction, Request, Response } from 'express'; // eslint-disable-line @typescript-eslint/no-unused-vars

import { LinkGetOneUseCase } from '@domain/link/useCases/LinkGetOneUseCase';
import { LinkRepo } from '@infrastructure/persistence/mySQL/repositories/LinkRepo';
import { LinkGetOneController } from '../controllers/LinkGetOneController';

const LinksRoute = express.Router();

LinksRoute.get('/:linkId', async (req: Request, res: Response, next: NextFunction) => {
  const linkRepo = new LinkRepo();
  const linkGetOneUseCase = new LinkGetOneUseCase(linkRepo);
  const linkGetOneController = new LinkGetOneController(linkGetOneUseCase);

  const response = await linkGetOneController.execute(req, res, next);

  return response;
});

export { LinksRoute };
