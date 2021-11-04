import express, { NextFunction, Request, Response } from 'express';

import { LinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { LinkRequestInfoUseCase } from '@domain/link/useCases/LinkRequestInfoUseCase';
import { LinkUpsertOneUseCase } from '@domain/link/useCases/LinkUpsertOneUseCase';
import { UserBookmarkCreateUseCase } from '@domain/user/useCases/UserBookmarkCreateUseCase';
import { UserBookmarkDeleteOneUseCase } from '@domain/user/useCases/UserBookmarkDeleteOneUseCase';
import { UserBookmarkGetAllUseCase } from '@domain/user/useCases/UserBookmarkGetAllUseCase';
import { UserBookmarkGetByUrlUseCase } from '@domain/user/useCases/UserBookmarkGetByUrlUseCase';
import { UserBookmarkGetOneUseCase } from '@domain/user/useCases/UserBookmarkGetOneUseCase';
import { UserBookmarkImportUseCase } from '@domain/user/useCases/UserBookmarkImportUseCase';
import { UserBookmarkUpdateUseCase } from '@domain/user/useCases/UserBookmarkUpdateUseCase';
import { UserCreateConfirmationUseCase } from '@domain/user/useCases/UserCreateConfirmationUseCase';
import { UserCreateOneUseCase } from '@domain/user/useCases/UserCreateOneUseCase';
import { UserDeleteOneUseCase } from '@domain/user/useCases/UserDeleteOneUseCase';
import { UserFollowerGetAllUseCase } from '@domain/user/useCases/UserFollowerGetAllUseCase';
import { UserFollowingCreateUseCase } from '@domain/user/useCases/UserFollowingCreateUseCase';
import { UserFollowingDeleteUseCase } from '@domain/user/useCases/UserFollowingDeleteUseCase';
import { UserFollowingGetAllUseCase } from '@domain/user/useCases/UserFollowingGetAllUseCase';
import { UserFollowingGetOneUseCase } from '@domain/user/useCases/UserFollowingGetOneUseCase';
import { UserGetAllUseCase } from '@domain/user/useCases/UserGetAllUseCase';
import { UserGetByIdsUseCase } from '@domain/user/useCases/UserGetByIdsUseCase';
import { UserGetOneUseCase } from '@domain/user/useCases/UserGetOneUseCase';
import { UserListGetAllPublicUseCase } from '@domain/user/useCases/UserListGetAllPublicUseCase';
import { UserRecommendedGetAllUseCase } from '@domain/user/useCases/UserRecommendedGetAllUseCase';
import { UserTagsGetAllUseCase } from '@domain/user/useCases/UserTagsGetAllUseCase';
import { UserUpdateOneUseCase } from '@domain/user/useCases/UserUpdateOneUseCase';
import { UserBookmarkCreateController } from '@infrastructure/http/controllers/UserBookmarkCreateController';
import { UserBookmarkDeleteOneController } from '@infrastructure/http/controllers/UserBookmarkDeleteOneController';
import { UserBookmarkGetAllController } from '@infrastructure/http/controllers/UserBookmarkGetAllController';
import { UserBookmarkGetByUrlController } from '@infrastructure/http/controllers/UserBookmarkGetByUrlController';
import { UserBookmarkGetOneController } from '@infrastructure/http/controllers/UserBookmarkGetOneController';
import { UserBookmarkImportController } from '@infrastructure/http/controllers/UserBookmarkImportController';
import { UserBookmarkUpdateController } from '@infrastructure/http/controllers/UserBookmarkUpdateController';
import { UserCreateConfirmationController } from '@infrastructure/http/controllers/UserCreateConfirmationController';
import { UserCreateOneController } from '@infrastructure/http/controllers/UserCreateOneController';
import { UserDeleteOneController } from '@infrastructure/http/controllers/UserDeleteOneController';
import { UserFollowerGetAllController } from '@infrastructure/http/controllers/UserFollowerGetAllController';
import { UserFollowingCreateController } from '@infrastructure/http/controllers/UserFollowingCreateController';
import { UserFollowingDeleteController } from '@infrastructure/http/controllers/UserFollowingDeleteController';
import { UserFollowingGetAllController } from '@infrastructure/http/controllers/UserFollowingGetAllController';
import { UserFollowingGetOneController } from '@infrastructure/http/controllers/UserFollowingGetOneController';
import { UserGetAllController } from '@infrastructure/http/controllers/UserGetAllController';
import { UserGetByIdsController } from '@infrastructure/http/controllers/UserGetByIdsController';
import { UserGetOneController } from '@infrastructure/http/controllers/UserGetOneController';
import { UserListGetAllPublicController } from '@infrastructure/http/controllers/UserListGetAllPublicController';
import { UserRecommendedGetAllController } from '@infrastructure/http/controllers/UserRecommendedGetAllController';
import { UserTagsGetAllController } from '@infrastructure/http/controllers/UserTagsGetAllController';
import { UserUpdateOneController } from '@infrastructure/http/controllers/UserUpdateOneController';
import { FileRepo } from '@infrastructure/persistence/fileSystem/repositories/FileRepo';
import { BookmarkRepo } from '@infrastructure/persistence/mySQL/repositories/BookmarkRepo';
import { LinkRepo } from '@infrastructure/persistence/mySQL/repositories/LinkRepo';
import { ListRepo } from '@infrastructure/persistence/mySQL/repositories/ListRepo';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';

const UsersRoute = express.Router();

UsersRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userGetAllUseCase = new UserGetAllUseCase(userRepo);
  const userGetAllController = new UserGetAllController(userGetAllUseCase);

  const response = await userGetAllController.execute(req, res, next);

  return response;
});

UsersRoute.get('/ids', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userGetByIdsUseCase = new UserGetByIdsUseCase(userRepo);
  const userGetByIdsController = new UserGetByIdsController(userGetByIdsUseCase);

  const response = await userGetByIdsController.execute(req, res, next);

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

UsersRoute.post('/sign-up-confirmation', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userCreateConfirmationUseCase = new UserCreateConfirmationUseCase(userRepo);
  const userCreateConfirmatioController = new UserCreateConfirmationController(userCreateConfirmationUseCase);

  const response = await userCreateConfirmatioController.execute(req, res, next);

  return response;
});

UsersRoute.put('/me', async (req: Request, res: Response, next: NextFunction) => {
  const fileRepo = new FileRepo();
  const userRepo = new UserRepo();
  const userUpdateOneUseCase = new UserUpdateOneUseCase(userRepo, fileRepo);
  const userUpdateOneController = new UserUpdateOneController(userUpdateOneUseCase);

  const response = await userUpdateOneController.execute(req, res, next);

  return response;
});

UsersRoute.delete('/me', async (req: Request, res: Response, next: NextFunction) => {
  const fileRepo = new FileRepo();
  const userRepo = new UserRepo();
  const userDeleteOneUseCase = new UserDeleteOneUseCase(userRepo, fileRepo);
  const userDeleteOneController = new UserDeleteOneController(userDeleteOneUseCase);

  const response = await userDeleteOneController.execute(req, res, next);

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
  const linkRepo = new LinkRepo();
  const bookmarkRepo = new BookmarkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo, bookmarkRepo);
  const userLinkGetAllUseCase = new UserBookmarkGetAllUseCase(userRepo, linkGetStatisticsUseCase);
  const userLinkGetAllController = new UserBookmarkGetAllController(userLinkGetAllUseCase);

  const response = await userLinkGetAllController.execute(req, res, next);

  return response;
});

UsersRoute.get('/me/bookmarks/url', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const linkRepo = new LinkRepo();
  const bookmarkRepo = new BookmarkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo, bookmarkRepo);
  const userBookarkGetByUrlUseCase = new UserBookmarkGetByUrlUseCase(userRepo, linkGetStatisticsUseCase);
  const userBookarkGetByUrlController = new UserBookmarkGetByUrlController(userBookarkGetByUrlUseCase);

  const response = await userBookarkGetByUrlController.execute(req, res, next);

  return response;
});

UsersRoute.get('/me/bookmarks/:bookmarkId', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const linkRepo = new LinkRepo();
  const bookmarkRepo = new BookmarkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo, bookmarkRepo);
  const userLinkGetOneUseCase = new UserBookmarkGetOneUseCase(userRepo, linkGetStatisticsUseCase);
  const userLinkGetOneController = new UserBookmarkGetOneController(userLinkGetOneUseCase);

  const response = await userLinkGetOneController.execute(req, res, next);

  return response;
});

UsersRoute.post('/me/bookmarks', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const linkRepo = new LinkRepo();
  const linkRequestInfoUseCase = new LinkRequestInfoUseCase();
  const linkUpsertOneUseCase = new LinkUpsertOneUseCase(linkRepo, linkRequestInfoUseCase);
  const userLinkCreateUseCase = new UserBookmarkCreateUseCase(userRepo, linkUpsertOneUseCase);
  const userLinkCreateController = new UserBookmarkCreateController(userLinkCreateUseCase);

  const response = await userLinkCreateController.execute(req, res, next);

  return response;
});

UsersRoute.post('/me/bookmarks/import', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const linkRepo = new LinkRepo();
  const linkRequestInfoUseCase = new LinkRequestInfoUseCase();
  const linkUpsertOneUseCase = new LinkUpsertOneUseCase(linkRepo, linkRequestInfoUseCase);
  const userLinkImportUseCase = new UserBookmarkImportUseCase(userRepo, linkUpsertOneUseCase);
  const userLinkImportController = new UserBookmarkImportController(userLinkImportUseCase);

  const response = await userLinkImportController.execute(req, res, next);

  return response;
});

UsersRoute.put('/me/bookmarks/:bookmarkId', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const linkRepo = new LinkRepo();
  const bookmarkRepo = new BookmarkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo, bookmarkRepo);
  const userLinkUpdateUseCase = new UserBookmarkUpdateUseCase(userRepo, linkGetStatisticsUseCase);
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
  const listRepo = new ListRepo();
  const userListGetAllPublicUseCase = new UserListGetAllPublicUseCase(userRepo, listRepo);
  const userListGetAllPublicController = new UserListGetAllPublicController(userListGetAllPublicUseCase);

  const response = await userListGetAllPublicController.execute(req, res, next);

  return response;
});

UsersRoute.get('/:userId/tags', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const userTagsGetAllUseCase = new UserTagsGetAllUseCase(userRepo);
  const userTagsGetAllController = new UserTagsGetAllController(userTagsGetAllUseCase);

  const response = await userTagsGetAllController.execute(req, res, next);

  return response;
});

UsersRoute.get('/me/recommended', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = new UserRepo();
  const linkRepo = new LinkRepo();
  const bookmarkRepo = new BookmarkRepo();
  const linkGetStatisticsUseCase = new LinkGetStatisticsUseCase(linkRepo, bookmarkRepo);
  const userRecommendedGetAllUseCase = new UserRecommendedGetAllUseCase(userRepo, linkGetStatisticsUseCase);
  const userRecommendedGetAllController = new UserRecommendedGetAllController(userRecommendedGetAllUseCase);

  const response = await userRecommendedGetAllController.execute(req, res, next);

  return response;
});

export { UsersRoute };
