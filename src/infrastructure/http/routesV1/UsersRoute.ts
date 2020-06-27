import express, { NextFunction, Request, Response } from 'express';

import { UserCreateUseCase } from '@domain/user/useCases/UserCreateUseCase';
import { UserFollowersGetAllUseCase } from '@domain/user/useCases/UserFollowersGetAllUseCase';
import { UserFollowingCreateUseCase } from '@domain/user/useCases/UserFollowingCreateUseCase';
import { UserFollowingDeleteUseCase } from '@domain/user/useCases/UserFollowingDeleteUseCase';
import { UserFollowingGetAllUseCase } from '@domain/user/useCases/UserFollowingGetAllUseCase';
import { UserGetAllUseCase } from '@domain/user/useCases/UserGetAllUseCase';
import { UserGetOneUseCase } from '@domain/user/useCases/UserGetOneUseCase';
import { UserCreateController } from '@infrastructure/http/controllers/UserCreateController';
import { UserFollowersGetAllController } from '@infrastructure/http/controllers/UserFollowersGetAllController';
import { UserFollowingCreateController } from '@infrastructure/http/controllers/UserFollowingCreateController';
import { UserFollowingDeleteController } from '@infrastructure/http/controllers/UserFollowingDeleteController';
import { UserFollowingGetAllController } from '@infrastructure/http/controllers/UserFollowingGetAllController';
import { UserGetAllController } from '@infrastructure/http/controllers/UserGetAllController';
import { UserGetOneController } from '@infrastructure/http/controllers/UserGetOneController';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';

const UsersRoute = express.Router();

UsersRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userGetAllUseCase = new UserGetAllUseCase(userRepo);
  const userGetAllController = new UserGetAllController(userGetAllUseCase);

  const response = await userGetAllController.execute(req, res, next);

  return response;
});

UsersRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userCreateUseCase = new UserCreateUseCase(userRepo);
  const userCreateController = new UserCreateController(userCreateUseCase);

  const response = await userCreateController.execute(req, res, next);

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
  const userFollowingCreateUseCase = new UserFollowingCreateUseCase(userRepo);
  const userFollowingCreateController = new UserFollowingCreateController(userFollowingCreateUseCase);

  const response = await userFollowingCreateController.execute(req, res, next);

  return response;
});

UsersRoute.delete('/:userId/following/:followedId', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userFollowingDeleteUseCase = new UserFollowingDeleteUseCase(userRepo);
  const userFollowingDeleteController = new UserFollowingDeleteController(userFollowingDeleteUseCase);

  const response = await userFollowingDeleteController.execute(req, res, next);

  return response;
});

UsersRoute.get('/:id/followers', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userFollowersGetAllUseCase = new UserFollowersGetAllUseCase(userRepo);
  const userFollowersGetAllController = new UserFollowersGetAllController(userFollowersGetAllUseCase);

  const response = await userFollowersGetAllController.execute(req, res, next);

  return response;
});

export { UsersRoute };
