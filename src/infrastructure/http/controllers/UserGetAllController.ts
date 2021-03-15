import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserGetAllUseCase } from '@domain/user/useCases/UserGetAllUseCase';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

const DEFAULT_USER_GET_ALL_SORT = '-createdat';

type UserGetAllControllerQueryType = {
  sort:
    | 'order'
    | '-order'
    | 'name'
    | '-name'
    | 'createdat'
    | '-createdat'
    | 'followers'
    | '-followers'
    | 'following'
    | '-following'
    | 'bookmarks'
    | '-bookmarks';
  page: {
    size: string;
    offset: string;
  };
  filter?: {
    name?: string;
  };
};

export class UserGetAllController extends BaseController {
  useCase: IUserGetAllUseCase;

  constructor(useCase: IUserGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort = DEFAULT_USER_GET_ALL_SORT, page: { size, offset } = {}, filter: { name } = {} } = req.query as UserGetAllControllerQueryType;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;
    const castedSort = sort || undefined;
    const castedSize = Number(size) || DEFAULT_PAGE_SIZE;
    const castedOffset = Number(offset) || undefined;

    const { users, meta } = await this.useCase.execute({
      session,
      sort: castedSort,
      size: castedSize,
      offset: castedOffset,
      filter: {
        name,
      },
    });

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
