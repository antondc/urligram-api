import express, { Request, Response, NextFunction } from 'express';
import { LoginUserRepo } from '@infrastructure/persistence/mySQL/repositories/LoginUserRepo';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILoginUserResponseDTO } from '@domain/user/dto/ILoginUserResponseDTO';
import { LoginUserAdapter } from '@adapter/LoginUserAdapter';
import { LoginUserUseCase } from '@domain/user/useCases/LoginUserUseCase';
import { TokenService } from '@infrastructure/services/TokenService';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginUserDTO: ILoginUserRequestDTO = req.body;

    const userRepo = new LoginUserRepo();
    const loginUserUseCase = new LoginUserUseCase(userRepo);
    const loginUserAdapter = new LoginUserAdapter(loginUserUseCase, loginUserDTO);

    const user: ILoginUserResponseDTO = await loginUserAdapter.authenticate();

    const tokenService = new TokenService();
    const token = tokenService.createToken(user);

    return res
      .cookie('sessionToken', token, {
        maxAge: 900000,
        httpOnly: true,
        path: '/',
      })
      .json({ user })
      .end();
  } catch (err) {
    return next(err);
  }
});

router.delete('/', function (req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie('sessionToken', { path: '/' }).status(205).send('205 RESET CONTENT').end();
  } catch (err) {
    next(err);
  }
});

export default router;
