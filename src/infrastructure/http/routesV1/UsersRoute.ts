import express, { NextFunction, Request, Response } from 'express';

import { CreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { GetUserByIdUseCase } from '@domain/user/useCases/GetUserByIdUseCase';
import { GetUserFollowersUseCase } from '@domain/user/useCases/GetUserFollowersUseCase';
import { GetUserFollowingUseCase } from '@domain/user/useCases/GetUserFollowingUseCase';
import { GetUsersUseCase } from '@domain/user/useCases/GetUsersUseCase';
import { UserFollowDeleteUseCase } from '@domain/user/useCases/UserFollowDeleteUseCase';
import { UserFollowUseCase } from '@domain/user/useCases/UserFollowUseCase';
import { CreateUserController } from '@infrastructure/http/controllers/CreateUserController';
import { GetUserByIdController } from '@infrastructure/http/controllers/GetUserByIdController';
import { GetUserFollowersController } from '@infrastructure/http/controllers/GetUserFollowersController';
import { GetUserFollowingController } from '@infrastructure/http/controllers/GetUserFollowingController';
import { GetUsersController } from '@infrastructure/http/controllers/GetUsersController';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';
import { UserFollowController } from '../controllers/UserFollowController';
import { UserFollowDeleteController } from '../controllers/UsersFollowDeleteController';

const UsersRoute = express.Router();

UsersRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const getUserUseCase = new GetUsersUseCase(userRepo);
  const getUserController = new GetUsersController(getUserUseCase);

  const response = await getUserController.execute(req, res, next);

  return response;
});

UsersRoute.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const getUserByIdUseCase = new GetUserByIdUseCase(userRepo);
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  const response = await getUserByIdController.execute(req, res, next);

  return response;
});

UsersRoute.get('/:id/following', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const getUserFollowingUserCase = new GetUserFollowingUseCase(userRepo);
  const getUserFollowingController = new GetUserFollowingController(getUserFollowingUserCase);

  const response = await getUserFollowingController.execute(req, res, next);

  return response;
});

UsersRoute.post('/:userId/following/:followedId', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userFollowUseCase = new UserFollowUseCase(userRepo);
  const userFollowController = new UserFollowController(userFollowUseCase);

  const response = await userFollowController.execute(req, res, next);

  return response;
});

UsersRoute.delete('/:userId/following/:followedId', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userFollowDeleteUseCase = new UserFollowDeleteUseCase(userRepo);
  const userFollowDeleteController = new UserFollowDeleteController(userFollowDeleteUseCase);

  const response = await userFollowDeleteController.execute(req, res, next);

  return response;
});

UsersRoute.get('/:id/followers', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const getUserFollowersUserCase = new GetUserFollowersUseCase(userRepo);
  const getUserFollowersController = new GetUserFollowersController(getUserFollowersUserCase);

  const response = await getUserFollowersController.execute(req, res, next);

  return response;
});

UsersRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const createUserUseCase = new CreateUserUseCase(userRepo);
  const createUserController = new CreateUserController(createUserUseCase);

  const response = await createUserController.execute(req, res, next);

  return response;
});

export { UsersRoute };
