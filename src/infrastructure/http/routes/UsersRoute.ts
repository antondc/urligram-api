import express, { Request, Response, NextFunction } from 'express';
import { CreateUserController } from '@infrastructure/http/controllers/CreateUserController';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';
import { CreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { FindUserRepo } from '@infrastructure/persistence/mySQL/repositories/FindUserRepo';

const UsersRoute = express.Router();

UsersRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createUserDTO: ICreateUserRequestDTO = req.body;

    const userRepo = new UserRepo();
    const findUserRepo = new FindUserRepo();
    const createUserUseCase = new CreateUserUseCase(userRepo, findUserRepo);
    const createUserController = new CreateUserController(createUserUseCase, createUserDTO);

    const response = await createUserController.createUser();

    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

export { UsersRoute };
