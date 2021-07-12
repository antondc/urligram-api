import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserFollowerGetAllUseCase } from '@domain/user/useCases/UserFollowerGetAllUseCase';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

const DEFAULT_FOLLOWERS_GET_ALL_SORT = 'name';

type UserFollowerGetAllControllerQueryType = {
  sort?: 'order' | '-order' | 'name' | '-name' | 'login' | '-login' | 'bookmarks' | '-bookmarks';
  page: {
    size: string;
    offset: string;
  };
  filter: {
    tags?: string;
  };
};

export class UserFollowerGetAllController extends BaseController {
  useCase: IUserFollowerGetAllUseCase;

  constructor(useCase: IUserFollowerGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort = DEFAULT_FOLLOWERS_GET_ALL_SORT, page: { size, offset } = {}, filter: { tags } = {} } = req.query as UserFollowerGetAllControllerQueryType;
    const { userId } = req.params;
    const castedSize = Number(size) || DEFAULT_PAGE_SIZE;
    const castedOffset = Number(offset) || undefined;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const { users, meta } = await this.useCase.execute({
      session,
      userId,
      sort,
      size: castedSize,
      offset: castedOffset,
      filter: {
        tags,
      },
    });

    const formattedItems = users.map((item) => {
      return {
        type: 'user',
        id: item.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/users/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/users/followers' + userId,
      },
      meta,
      data: formattedItems,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
