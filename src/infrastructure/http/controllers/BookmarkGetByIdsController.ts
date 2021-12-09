import { Request, Response } from 'express';

import { IBookmarkGetByIdsUseCase } from '@domain/bookmark/useCases/BookmarkGetByIdsUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

type BookmarkGetByIdsControllerQueryType = {
  ids: string[];
};

export class BookmarkGetByIdsController extends BaseController {
  useCase: IBookmarkGetByIdsUseCase;

  constructor(useCase: IBookmarkGetByIdsUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { ids } = req.query as BookmarkGetByIdsControllerQueryType;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const users = await this.useCase.execute({ session, ids });

    const formattedUsers = users.map((item) => {
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
        self: URL_SERVER + PATH_API_V1 + '/users',
      },
      data: formattedUsers,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
