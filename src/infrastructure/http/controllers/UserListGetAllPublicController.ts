import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserListGetAllPublicRequest } from '@domain/user/useCases/interfaces/IUserListGetAllPublicRequest';
import { IUserListGetAllPublicUseCase } from '@domain/user/useCases/UserListGetAllPublicUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

const DEFAULT_LIST_GET_ALL_SORT = '-createdAt';

type UserListGetAllPublicControllerQueryType = {
  sort?: 'id' | '-id' | 'order' | '-order' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'members' | '-members' | 'bookmarks' | '-bookmarks';
  page: {
    size: string;
    offset: string;
  };
  filter?: {
    role?: string[];
    lists?: string[];
    tags?: string[];
  };
};

export class UserListGetAllPublicController extends BaseController {
  useCase: IUserListGetAllPublicUseCase;

  constructor(useCase: IUserListGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const {
      sort = DEFAULT_LIST_GET_ALL_SORT,
      page: { size, offset } = {},
      filter: { role, lists, tags } = {},
    } = req.query as UserListGetAllPublicControllerQueryType;
    const checkedSize = Number(size) || undefined;
    const checkedOffset = Number(offset) || undefined;
    const { userId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);
    const userOrSession = userId === 'me' ? session?.id : userId;

    const userListGetAllPublicRequest: IUserListGetAllPublicRequest = {
      userId: userOrSession,
      session,
      sort,
      size: checkedSize,
      offset: checkedOffset,
      filter: {
        role,
        lists,
        tags,
      },
    };

    const { lists: listsResult, meta } = await this.useCase.execute(userListGetAllPublicRequest);

    const formattedLinks = listsResult.map((item) => {
      return {
        type: 'list',
        id: item.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/lists/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/users/' + userId + '/lists',
      },
      meta,
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
