import express, { Request, Response, NextFunction } from 'express';
import { LoginUserRepo } from '@infrastructure/persistence/mySQL/repositories/LoginUserRepo';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { LoginUserAdapter } from '@infrastructure/http/adapters/LoginUserAdapter';
import { LoginUserUseCase } from '@domain/user/useCases/LoginUserUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { LogOutUserRepo } from '@infrastructure/persistence/mySQL/repositories/LogOutUserRepo';
import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { LogOutUserAdapter } from '@infrastructure/http/adapters/LogOutUserAdapter';
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
    const loginUserAdapter = new LoginUserAdapter(loginUserUseCase, loginUserDTO);

    const response = await loginUserAdapter.authenticate();

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
    const logOutUserAdapter = new LogOutUserAdapter(logOutUserUseCase, logOutUserRequestDTO);

    const response = await logOutUserAdapter.deauthenticate();

    res.clearCookie('sessionToken', { path: '/' }).status(205).send(response);
  } catch (err) {
    return next(err);
  }
});

export { LoginRoute };
