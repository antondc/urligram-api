import express, { Request, Response } from 'express';
import { CreateUserAdapter } from '@adapter/CreateUserAdapter';
import { CreateUserRepo } from '@infrastructure/persistence/mySQL/repositories/CreateUserRepo';
import { CreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const createUserDTO: ICreateUserRequestDTO = req.body;

  const userRepo = new CreateUserRepo();
  const createUserUseCase = new CreateUserUseCase(userRepo);
  const createUserAdapter = new CreateUserAdapter(createUserUseCase, createUserDTO);

  const response: ICreateUserResponseDTO = await createUserAdapter.createUser();

  return res.status(200).send(response);
});

export default router;
