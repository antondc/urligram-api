import express, { Request, Response } from 'express';
import { LoginUserRepo } from '@infrastructure/persistence/mySQL/repositories/LoginUserRepo';
import { ILoginUserDTO } from '@domain/ILoginUserDTO';
import { LoginUserAdapter } from '@adapter/LoginUserAdapter';
import { LoginUserUseCase } from '@application/LoginUserUseCase';
import { TokenCreator } from '@infrastructure/services/TokenCreator';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const loginUserDTO: ILoginUserDTO = req.body;

  const userRepo = new LoginUserRepo();
  const loginUserUseCase = new LoginUserUseCase(userRepo);
  const loginUserAdapter = new LoginUserAdapter(loginUserUseCase, loginUserDTO);

  const [[user]] = await loginUserAdapter.authenticate();

  if (!user) res.status(403).send('Logged failed').end();

  const tokenCreator = new TokenCreator();
  const token = tokenCreator.createToken(user);

  return res
    .cookie('sessionToken', token, {
      maxAge: 900000,
      httpOnly: true,
      path: '/',
    })
    .json({ user })
    .end();
});

router.delete('/', function (req, res, next) {
  res.clearCookie('sessionToken', { path: '/' }).status(200).send('Cookie cleared').end();
});

export default router;
