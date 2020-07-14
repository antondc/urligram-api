import express, { NextFunction, Request, Response } from 'express';

import { UserCreateOneUseCase } from '@domain/user/useCases/UserCreateOneUseCase';
import { UserDeleteOneUseCase } from '@domain/user/useCases/UserDeleteOneUseCase';
import { UserGetAllUseCase } from '@domain/user/useCases/UserGetAllUseCase';
import { UserGetOneUseCase } from '@domain/user/useCases/UserGetOneUseCase';
import { UserUpdateOneUseCase } from '@domain/user/useCases/UserUpdateOneUseCase';
import { UserCreateOneController } from '@infrastructure/http/controllers/UserCreateOneController';
import { UserGetAllController } from '@infrastructure/http/controllers/UserGetAllController';
import { UserGetOneController } from '@infrastructure/http/controllers/UserGetOneController';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';
import { UserDeleteOneController } from '../controllers/UserDeleteOneController';
import { UserUpdateOneController } from '../controllers/UserUpdateOneController';

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

UsersRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userCreateOneUseCase = new UserCreateOneUseCase(userRepo);
  const userCreateOneController = new UserCreateOneController(userCreateOneUseCase);

  const response = await userCreateOneController.execute(req, res, next);

  return response;
});

UsersRoute.put('/me', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userUpdateOneUseCase = new UserUpdateOneUseCase(userRepo);
  const userUpdateOneController = new UserUpdateOneController(userUpdateOneUseCase);

  const response = await userUpdateOneController.execute(req, res, next);

  return response;
});

UsersRoute.delete('/me', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userDeleteOneUseCase = new UserDeleteOneUseCase(userRepo);
  const userDeleteOneController = new UserDeleteOneController(userDeleteOneUseCase);

  const response = await userDeleteOneController.execute(req, res, next);

  return response;
});

export { UsersRoute };
