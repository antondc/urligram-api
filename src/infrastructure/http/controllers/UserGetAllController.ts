import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserGetAllUseCase } from '@domain/user/useCases/UserGetAllUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

type UserGetAllControllerQueryType = {
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

export class UserGetAllController extends BaseController {
  useCase: IUserGetAllUseCase;

  constructor(useCase: IUserGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort, page: { size, offset } = {} } = req.query as UserGetAllControllerQueryType;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;
    const castedSort = sort || undefined;
    const castedSize = Number(size) || 10;
    const castedOffset = Number(offset) || undefined;

    const { users, meta } = await this.useCase.execute({ session, sort: castedSort, size: castedSize, offset: castedOffset });

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
      meta,
      links: {
        self: URL_SERVER + req.originalUrl,
      },
      data: formattedUsers,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
