import express, { NextFunction, Request, Response } from 'express';

import { CreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { GetUserFollowersUseCase } from '@domain/user/useCases/GetUserFollowersUseCase';
import { UserFollowDeleteUseCase } from '@domain/user/useCases/UserFollowDeleteUseCase';
import { UserFollowingGetAllUseCase } from '@domain/user/useCases/UserFollowingGetAllUseCase';
import { UserFollowUseCase } from '@domain/user/useCases/UserFollowUseCase';
import { UserGetAllUseCase } from '@domain/user/useCases/UserGetAllUseCase';
import { UserGetOneUseCase } from '@domain/user/useCases/UserGetOneUseCase';
import { CreateUserController } from '@infrastructure/http/controllers/CreateUserController';
import { GetUserFollowersController } from '@infrastructure/http/controllers/GetUserFollowersController';
import { UserFollowingGetAllController } from '@infrastructure/http/controllers/GetUserFollowingController';
import { UserFollowController } from '@infrastructure/http/controllers/UserFollowController';
import { UserGetAllController } from '@infrastructure/http/controllers/UserGetAllController';
import { UserGetOneController } from '@infrastructure/http/controllers/UserGetOneController';
import { UserFollowDeleteController } from '@infrastructure/http/controllers/UsersFollowDeleteController';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';

const UsersRoute = express.Router();

UsersRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userGetAllUseCase = new UserGetAllUseCase(userRepo);
  const userGetAllController = new UserGetAllController(userGetAllUseCase);

  const response = await userGetAllController.execute(req, res, next);

  return response;
});

UsersRoute.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userGetOneUseCase = new UserGetOneUseCase(userRepo);
  const userGetOneController = new UserGetOneController(userGetOneUseCase);

  const response = await userGetOneController.execute(req, res, next);

  return response;
});

UsersRoute.get('/:id/following', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userFollowingGetAllUserCase = new UserFollowingGetAllUseCase(userRepo);
  const userFollowingGetAllController = new UserFollowingGetAllController(userFollowingGetAllUserCase);

  const response = await userFollowingGetAllController.execute(req, res, next);

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
