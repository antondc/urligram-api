import express, { NextFunction, Request, Response } from 'express';

import { UserLoginUseCase } from '@domain/user/useCases/UserLoginUseCase';
import { UserLogOutUseCase } from '@domain/user/useCases/UserLogOutUseCase';
import { UserLoginController } from '@infrastructure/http/controllers/UserLoginController';
import { UserLogOutController } from '@infrastructure/http/controllers/UserLogOutController';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';

const LoginRoute = express.Router();

LoginRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userLoginUseCase = new UserLoginUseCase(userRepo);
  const userLoginController = new UserLoginController(userLoginUseCase);

  const response = await userLoginController.execute(req, res, next);

  return response;
});

LoginRoute.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userLogOutUseCase = new UserLogOutUseCase(userRepo);
  const userLogOutController = new UserLogOutController(userLogOutUseCase);

  const response = await userLogOutController.execute(req, res, next);

  return response;
});

export { LoginRoute };
