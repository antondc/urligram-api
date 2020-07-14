import express, { NextFunction, Request, Response } from 'express'; // eslint-disable-line @typescript-eslint/no-unused-vars

import { UserLoginUseCase } from '@domain/user/useCases/UserLoginUseCase';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';
import { UserLoginController } from '../controllers/UserLoginController';

const LoginRoute = express.Router();

LoginRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userLoginUseCase = new UserLoginUseCase(userRepo);
  const userLoginController = new UserLoginController(userLoginUseCase);

  const response = await userLoginController.execute(req, res, next);

  return response;
});

export { LoginRoute };
