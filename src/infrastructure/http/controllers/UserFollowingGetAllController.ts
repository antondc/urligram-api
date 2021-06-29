import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserFollowingGetAllUseCase } from '@domain/user/useCases/UserFollowingGetAllUseCase';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

const DEFAULT_FOLLOWING_GET_ALL_SORT = 'name';

type UserFollowingGetAllControllerQueryType = {
  sort?: 'order' | '-order' | 'name' | '-name' | 'login' | '-login' | 'bookmarks' | '-bookmarks';
  page: {
    size: string;
    offset: string;
  };
};

export class UserFollowingGetAllController extends BaseController {
  useCase: IUserFollowingGetAllUseCase;

  constructor(useCase: IUserFollowingGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort = DEFAULT_FOLLOWING_GET_ALL_SORT, page: { size, offset } = {} } = req.query as UserFollowingGetAllControllerQueryType;
    const { userId } = req.params;
    const castedSize = Number(size) || DEFAULT_PAGE_SIZE;
    const castedOffset = Number(offset) || undefined;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const { users, meta } = await this.useCase.execute({ session, userId, sort, size: castedSize, offset: castedOffset });

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
        self: URL_SERVER + PATH_API_V1 + '/users/' + userId + '/following',
      },
      meta,
      data: formattedItems,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
