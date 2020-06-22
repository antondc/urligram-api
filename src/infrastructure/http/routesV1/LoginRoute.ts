import express, { Request, Response, NextFunction } from 'express';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { LoginUserController } from '@infrastructure/http/controllers/LoginUserController';
import { LoginUserUseCase } from '@domain/user/useCases/LoginUserUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { LogOutUserController } from '@infrastructure/http/controllers/LogOutUserController';
import { LogOutUserUseCase } from '@domain/user/useCases/LogOutUserUseCase';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';
import { User } from '@domain/user/entities/User';

const LoginRoute = express.Router();

LoginRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginUserDTO: ILoginUserRequestDTO = req.body;

    const userRepo = new UserRepo();
    const loginUserUseCase = new LoginUserUseCase(userRepo);
    const loginUserController = new LoginUserController(loginUserUseCase);

    const response = await loginUserController.execute(loginUserDTO);

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

    const userRepo = new UserRepo();
    const logOutUserUseCase = new LogOutUserUseCase(userRepo);
    const logOutUserController = new LogOutUserController(logOutUserUseCase);

    const response = await logOutUserController.execute(logOutUserRequestDTO);

    res.clearCookie('sessionToken', { path: '/' }).status(205).send(response);
  } catch (err) {
    return next(err);
  }
});

export { LoginRoute };
