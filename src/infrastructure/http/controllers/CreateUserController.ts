import express, { Request, Response, NextFunction } from 'express';
import { CreateUserAdapter } from '@infrastructure/http/adapters/CreateUserAdapter';
import { CreateUserRepo } from '@infrastructure/persistence/mySQL/repositories/CreateUserRepo';
import { CreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createUserDTO: ICreateUserRequestDTO = req.body;

    const userRepo = new CreateUserRepo();
    const createUserUseCase = new CreateUserUseCase(userRepo);
    const createUserAdapter = new CreateUserAdapter(createUserUseCase, createUserDTO);

    const response: ICreateUserResponseDTO = await createUserAdapter.createUser();

    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

export default router;
