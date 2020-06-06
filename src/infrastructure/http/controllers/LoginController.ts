import express, { Request, Response } from 'express';
import { CreateUserAdapter } from '@adapter/CreateUserAdapter';
import { LoginUserRepo } from '@infrastructure/persistence/mySQL/repositories/LoginUserRepo';
import { ILoginUserDTO } from '@domain/ILoginUserDTO';
import { User } from '@domain/User';
import { LoginUserAdapter } from '@adapter/LoginUserAdapter';
import { LoginUserUseCase } from '@application/LoginUserUseCase';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const loginUserDTO: ILoginUserDTO = req.body;

  const userRepo = new LoginUserRepo();
  const loginUserUseCase = new LoginUserUseCase(userRepo);
  const loginUserAdapter = new LoginUserAdapter(loginUserUseCase, loginUserDTO);

  const response = await loginUserAdapter.authenticate();

  return res.status(200).send(response);
});

export default router;
