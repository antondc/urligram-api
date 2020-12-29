import express, { NextFunction, Request, Response } from 'express';

import { LinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { UserBookmarkCreateUseCase } from '@domain/user/useCases/UserBookmarkCreateUseCase';
import { UserBookmarkDeleteOneUseCase } from '@domain/user/useCases/UserBookmarkDeleteOneUseCase';
import { UserBookmarkGetAllUseCase } from '@domain/user/useCases/UserBookmarkGetAllUseCase';
import { UserBookmarkGetOneUseCase } from '@domain/user/useCases/UserBookmarkGetOneUseCase';
import { UserBookmarkUpdateUseCase } from '@domain/user/useCases/UserBookmarkUpdateUseCase';
import { UserCreateOneUseCase } from '@domain/user/useCases/UserCreateOneUseCase';
import { UserDeleteOneUseCase } from '@domain/user/useCases/UserDeleteOneUseCase';
import { UserFollowerGetAllUseCase } from '@domain/user/useCases/UserFollowerGetAllUseCase';
import { UserFollowingCreateUseCase } from '@domain/user/useCases/UserFollowingCreateUseCase';
import { UserFollowingDeleteUseCase } from '@domain/user/useCases/UserFollowingDeleteUseCase';
import { UserFollowingGetAllUseCase } from '@domain/user/useCases/UserFollowingGetAllUseCase';
import { UserFollowingGetOneUseCase } from '@domain/user/useCases/UserFollowingGetOneUseCase';
import { UserGetAllUseCase } from '@domain/user/useCases/UserGetAllUseCase';
import { UserGetOneUseCase } from '@domain/user/useCases/UserGetOneUseCase';
import { UserListGetAllPublicUseCase } from '@domain/user/useCases/UserListGetAllPublicUseCase';
import { UserPasswordUpdateUseCase } from '@domain/user/useCases/UserPasswordUpdateUseCase';
import { UserUpdateOneUseCase } from '@domain/user/useCases/UserUpdateOneUseCase';
import { UserBookmarkCreateController } from '@infrastructure/http/controllers/UserBookmarkCreateController';
import { UserBookmarkGetAllController } from '@infrastructure/http/controllers/UserBookmarkGetAllController';
import { UserBookmarkGetOneController } from '@infrastructure/http/controllers/UserBookmarkGetOneController';
import { UserCreateOneController } from '@infrastructure/http/controllers/UserCreateOneController';
import { UserDeleteOneController } from '@infrastructure/http/controllers/UserDeleteOneController';
import { UserFollowerGetAllController } from '@infrastructure/http/controllers/UserFollowerGetAllController';
import { UserFollowingCreateController } from '@infrastructure/http/controllers/UserFollowingCreateController';
import { UserFollowingDeleteController } from '@infrastructure/http/controllers/UserFollowingDeleteController';
import { UserFollowingGetAllController } from '@infrastructure/http/controllers/UserFollowingGetAllController';
import { UserFollowingGetOneController } from '@infrastructure/http/controllers/UserFollowingGetOneController';
import { UserGetAllController } from '@infrastructure/http/controllers/UserGetAllController';
import { UserGetOneController } from '@infrastructure/http/controllers/UserGetOneController';
import { UserPasswordUpdateController } from '@infrastructure/http/controllers/UserPasswordUpdateController';
import { UserUpdateOneController } from '@infrastructure/http/controllers/UserUpdateOneController';
import { LinkRepo } from '@infrastructure/persistence/mySQL/repositories/LinkRepo';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';
import { UserBookmarkDeleteOneController } from '../controllers/UserBookmarkDeleteOneController';
import { UserBookmarkUpdateController } from '../controllers/UserBookmarkUpdateController';
import { UserListGetAllPublicController } from '../controllers/UserListGetAllPublicController';

const UsersRoute = express.Router();

UsersRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userGetAllUseCase = new UserGetAllUseCase(userRepo);
  const userGetAllController = new UserGetAllController(userGetAllUseCase);

  const response = await userGetAllController.execute(req, res, next);

  return response;
});

UsersRoute.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userGetOneUseCase = new UserGetOneUseCase(userRepo);
  const userGetOneController = new UserGetOneController(userGetOneUseCase);

  const response = await userGetOneController.execute(req, res, next);

  return response;
});

UsersRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userCreateOneUseCase = new UserCreateOneUseCase(userRepo);
  const userCreateOneController = new UserCreateOneController(userCreateOneUseCase);

  const response = await userCreateOneController.execute(req, res, next);

  return response;
});

UsersRoute.put('/me', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userUpdateOneUseCase = new UserUpdateOneUseCase(userRepo);
  const userUpdateOneController = new UserUpdateOneController(userUpdateOneUseCase);

  const response = await userUpdateOneController.execute(req, res, next);

  return response;
});

UsersRoute.delete('/me', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userDeleteOneUseCase = new UserDeleteOneUseCase(userRepo);
  const userDeleteOneController = new UserDeleteOneController(userDeleteOneUseCase);

  const response = await userDeleteOneController.execute(req, res, next);

  return response;
});

UsersRoute.put('/me/password', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userPasswordUpdateUseCase = new UserPasswordUpdateUseCase(userRepo);
  const userPasswordUpdateController = new UserPasswordUpdateController(userPasswordUpdateUseCase);

  const response = await userPasswordUpdateController.execute(req, res, next);

  return response;
});

UsersRoute.get('/:userId/following', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userFollowingGetAllUserCase = new UserFollowingGetAllUseCase(userRepo);
  const userFollowingGetAllController = new UserFollowingGetAllController(userFollowingGetAllUserCase);

  const response = await userFollowingGetAllController.execute(req, res, next);

  return response;
});

UsersRoute.get('/me/following/:followedId', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userFollowingGetOneUseCase = new UserFollowingGetOneUseCase(userRepo);
  const userFollowingGetOneController = new UserFollowingGetOneController(userFollowingGetOneUseCase);

  const response = await userFollowingGetOneController.execute(req, res, next);

  return response;
});

UsersRoute.post('/me/following/:followedId', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userFollowingCreateUseCase = new UserFollowingCreateUseCase(userRepo);
  const userFollowingCreateController = new UserFollowingCreateController(userFollowingCreateUseCase);

  const response = await userFollowingCreateController.execute(req, res, next);

  return response;
});

UsersRoute.delete('/me/following/:followedId', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userFollowingDeleteUseCase = new UserFollowingDeleteUseCase(userRepo);
  const userFollowingDeleteController = new UserFollowingDeleteController(userFollowingDeleteUseCase);

  const response = await userFollowingDeleteController.execute(req, res, next);

  return response;
});

UsersRoute.get('/:userId/followers', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userFollowerGetAllUseCase = new UserFollowerGetAllUseCase(userRepo);
  const userFollowerGetAllController = new UserFollowerGetAllController(userFollowerGetAllUseCase);

  const response = await userFollowerGetAllController.execute(req, res, next);

  return response;
});

UsersRoute.get('/:userId/bookmarks', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userLinkGetAllUseCase = new UserBookmarkGetAllUseCase(userRepo);
  const userLinkGetAllController = new UserBookmarkGetAllController(userLinkGetAllUseCase);

  const response = await userLinkGetAllController.execute(req, res, next);

  return response;
});

UsersRoute.get('/me/bookmarks/:bookmarkId', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const linkRepo = new LinkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo);
  const userLinkGetOneUseCase = new UserBookmarkGetOneUseCase(userRepo, linkGetStatisticsUseCase);
  const userLinkGetOneController = new UserBookmarkGetOneController(userLinkGetOneUseCase);

  const response = await userLinkGetOneController.execute(req, res, next);

  return response;
});

UsersRoute.post('/me/bookmarks', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userLinkCreateUseCase = new UserBookmarkCreateUseCase(userRepo);
  const userLinkCreateController = new UserBookmarkCreateController(userLinkCreateUseCase);

  const response = await userLinkCreateController.execute(req, res, next);

  return response;
});

UsersRoute.put('/me/bookmarks/:bookmarkId', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userLinkUpdateUseCase = new UserBookmarkUpdateUseCase(userRepo);
  const userLinkUpdateController = new UserBookmarkUpdateController(userLinkUpdateUseCase);

  const response = await userLinkUpdateController.execute(req, res, next);

  return response;
});

UsersRoute.delete('/me/bookmarks/:bookmarkId', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userLinkDeleteUseCase = new UserBookmarkDeleteOneUseCase(userRepo);
  const userLinkDeleteController = new UserBookmarkDeleteOneController(userLinkDeleteUseCase);

  const response = await userLinkDeleteController.execute(req, res, next);

  return response;
});

UsersRoute.get('/:userId/lists', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userListGetAllPublicUseCase = new UserListGetAllPublicUseCase(userRepo);
  const userListGetAllPublicController = new UserListGetAllPublicController(userListGetAllPublicUseCase);

  const response = await userListGetAllPublicController.execute(req, res, next);

  return response;
});

export { UsersRoute };
