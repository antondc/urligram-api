import express, { Request, Response, NextFunction } from 'express';
import { LoginUserRepo } from '@infrastructure/persistence/mySQL/repositories/LoginUserRepo';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { LoginUserController } from '@infrastructure/http/controllers/LoginUserController';
import { LoginUserUseCase } from '@domain/user/useCases/LoginUserUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { LogOutUserRepo } from '@infrastructure/persistence/mySQL/repositories/LogOutUserRepo';
import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { LogOutUserController } from '@infrastructure/http/controllers/LogOutUserController';
import { LogOutUserUseCase } from '@domain/user/useCases/LogOutUserUseCase';
import { User } from '@domain/user/entities/User';
import { FindUserRepo } from '@infrastructure/persistence/mySQL/repositories/FindUserRepo';

const LoginRoute = express.Router();

LoginRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginUserDTO: ILoginUserRequestDTO = req.body;

    const loginUserRepo = new LoginUserRepo();
    const findUserRepo = new FindUserRepo();
    const loginUserUseCase = new LoginUserUseCase(loginUserRepo, findUserRepo);
    const loginUserController = new LoginUserController(loginUserUseCase, loginUserDTO);

    const response = await loginUserController.authenticate();

    const tokenService = new TokenService();
    const token = tokenService.createToken(response.data[0].attributes);

    return res
      .cookie('sessionToken', token, {
        maxAge: 900000,
        httpOnly: true,
        path: '/',
      })
      .json(response)
      .end();
  } catch (err) {
    return next(err);
  }
});

LoginRoute.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenService = new TokenService();
    const { id } = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const logOutUserRequestDTO: ILogOutUserRequestDTO = { id };

    const logOutUserRepo = new LogOutUserRepo();
    const logOutUserUseCase = new LogOutUserUseCase(logOutUserRepo);
    const logOutUserController = new LogOutUserController(logOutUserUseCase, logOutUserRequestDTO);

    const response = await logOutUserController.deauthenticate();

    res.clearCookie('sessionToken', { path: '/' }).status(205).send(response);
  } catch (err) {
    return next(err);
  }
});

export { LoginRoute };
