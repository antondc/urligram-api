import express, { Request, Response, NextFunction } from 'express';
import { CreateUserController } from '@infrastructure/http/controllers/CreateUserController';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';
import { CreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createUserDTO: ICreateUserRequestDTO = req.body;

    const userRepo = new UserRepo();
    const createUserUseCase = new CreateUserUseCase(userRepo);
    const createUserController = new CreateUserController(createUserUseCase);

    const response = await createUserController.execute(createUserDTO);

    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

export default router;
