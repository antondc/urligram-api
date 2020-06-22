import express, { NextFunction, Request, Response } from 'express';

import { CreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { CreateUserController } from '@infrastructure/http/controllers/CreateUserController';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';

const UsersRoute = express.Router();

UsersRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const createUserUseCase = new CreateUserUseCase(userRepo);
  const createUserController = new CreateUserController(createUserUseCase);

  const response = await createUserController.execute(req, res, next);

  return response;
});

export { UsersRoute };
