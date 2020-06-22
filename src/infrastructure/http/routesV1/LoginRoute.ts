import express, { NextFunction, Request, Response } from 'express';

import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { User } from '@domain/user/entities/User';
import { LoginUserUseCase } from '@domain/user/useCases/LoginUserUseCase';
import { LogOutUserUseCase } from '@domain/user/useCases/LogOutUserUseCase';
import { LoginUserController } from '@infrastructure/http/controllers/LoginUserController';
import { LogOutUserController } from '@infrastructure/http/controllers/LogOutUserController';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';
import { TokenService } from '@infrastructure/services/TokenService';

const LoginRoute = express.Router();

LoginRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const loginUserUseCase = new LoginUserUseCase(userRepo);
  const loginUserController = new LoginUserController(loginUserUseCase);

  const response = await loginUserController.execute(req, res, next);
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
