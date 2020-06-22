import express, { NextFunction, Request, Response } from 'express';

import { CreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { GetUsersUseCase } from '@domain/user/useCases/GetUsersUseCase';
import { CreateUserController } from '@infrastructure/http/controllers/CreateUserController';
import { GetUsersController } from '@infrastructure/http/controllers/GetUsersController';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';

const UsersRoute = express.Router();

UsersRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const getUserUseCase = new GetUsersUseCase(userRepo);
  const getUserController = new GetUsersController(getUserUseCase);

  const response = await getUserController.execute(req, res, next);

  return response;
});

UsersRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const createUserUseCase = new CreateUserUseCase(userRepo);
  const createUserController = new CreateUserController(createUserUseCase);

  const response = await createUserController.execute(req, res, next);

  return response;
});

export { UsersRoute };
