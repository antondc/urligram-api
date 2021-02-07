import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserGetByIdsUseCase } from '@domain/user/useCases/UserGetByIdsUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

type UserGetByIdsControllerQueryType = {
  userIds: string;
  sort:
    | 'order'
    | '-order'
    | 'createdAt'
    | '-createdAt'
    | 'updatedAt'
    | '-updatedAt'
    | 'followers'
    | '-followers'
    | 'following'
    | '-following'
    | 'bookmarks'
    | '-bookmarks'
    | 'lists'
    | '-lists';
  page: {
    size: string;
    offset: string;
  };
};

export class UserGetByIdsController extends BaseController {
  useCase: IUserGetByIdsUseCase;

  constructor(useCase: IUserGetByIdsUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort, userIds, page: { size, offset } = {} } = req.query as UserGetByIdsControllerQueryType;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;
    const castedSort = sort;
    const userIdsArray = userIds.split(',');
    const castedSize = Number(size) || null;
    const castedOffset = Number(offset) || null;

    const users = await this.useCase.execute({ session, userIds: userIdsArray, sort: castedSort, size: castedSize, offset: castedOffset });

    const formattedUsers = users.map((item) => {
      return {
        type: 'user',
        id: item.id,
        session: {
          self: URL_SERVER + '/users/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users',
      },
      data: formattedUsers,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
