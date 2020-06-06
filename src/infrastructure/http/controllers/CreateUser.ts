import express, { Request, Response } from 'express';
import { CreateUserAdapter } from '@adapter/CreateUserAdapter';
import { CreateUserRepo } from '@infrastructure/persistence/mySQL/repositories/CreateUserRepo';
import { CreateUserUseCase } from '@application/CreateUserUseCase';
import { ICreateUserDTO } from '@application/ICreateUserDTO';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const createUserDTO: ICreateUserDTO = req.body;

  const userRepo = new CreateUserRepo();
  const createUserUseCase = new CreateUserUseCase(userRepo);
  const createUserAdapter = new CreateUserAdapter(createUserUseCase, createUserDTO);

  const response = await createUserAdapter.createUser();

  return res.status(200).send(response);
});

export default router;
