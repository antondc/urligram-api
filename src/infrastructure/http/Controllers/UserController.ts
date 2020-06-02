import express, { Request, Response } from 'express';
import { CreateUserController } from '@adapter/CreateUserController';
import { CreateUserRepo } from '@infrastructure/DB/CreateUserRepo';
import { CreateUserUseCase } from '@application/CreateUserUseCase';
import { ICreateUserDTO } from '@application/ICreateUserDTO';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const createUserDTO: ICreateUserDTO = req.body;

  const userRepo = new CreateUserRepo();
  const createUserUseCase = new CreateUserUseCase(userRepo);
  const createUserController = new CreateUserController(createUserUseCase, createUserDTO);

  createUserController.createUser();

  return res.status(200).send('END');
});

export default router;
