import express, { NextFunction, Request, Response } from 'express'; // eslint-disable-line @typescript-eslint/no-unused-vars

import { UserGetAllUseCase } from '@domain/user/useCases/UserGetAllUseCase';
import { UserGetOneUseCase } from '@domain/user/useCases/UserGetOneUseCase';
import { UserGetAllController } from '@infrastructure/http/controllers/UserGetAllController';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';
import { UserGetOneController } from '../controllers/UserGetOneController';

const UsersRoute = express.Router();

UsersRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userGetAllUseCase = new UserGetAllUseCase(userRepo);
  const userGetAllController = new UserGetAllController(userGetAllUseCase);

  const response = await userGetAllController.execute(req, res, next);

  return response;
});

UsersRoute.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userGetOneUseCase = new UserGetOneUseCase(userRepo);
  const userGetOneController = new UserGetOneController(userGetOneUseCase);

  const response = await userGetOneController.execute(req, res, next);

  return response;
});

export { UsersRoute };
