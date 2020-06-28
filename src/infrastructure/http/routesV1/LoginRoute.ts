import express, { NextFunction, Request, Response } from 'express';

import { LogOutUserUseCase } from '@domain/user/useCases/LogOutUserUseCase';
import { UserLoginUseCase } from '@domain/user/useCases/UserLoginUseCase';
import { LogOutUserController } from '@infrastructure/http/controllers/LogOutUserController';
import { UserLoginController } from '@infrastructure/http/controllers/UserLoginController';
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
  const logOutUserUseCase = new LogOutUserUseCase(userRepo);
  const logOutUserController = new LogOutUserController(logOutUserUseCase);

  const response = await logOutUserController.execute(req, res, next);

  return response;
});

export { LoginRoute };
