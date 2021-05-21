import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserBookmarkGetByUrlRequest } from '@domain/user/useCases/interfaces/IUserBookmarkGetByUrlRequest';
import { IUserBookmarkGetByUrlUseCase } from '@domain/user/useCases/UserBookmarkGetByUrlUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

type BookmarkGetByUrlControllerQueryType = {
  url: string;
};

export class UserBookmarkGetByUrlController extends BaseController {
  useCase: IUserBookmarkGetByUrlUseCase;

  constructor(useCase: IUserBookmarkGetByUrlUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { url = '' } = req.query as BookmarkGetByUrlControllerQueryType;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const userBookmarkGetByUrlRequest: IUserBookmarkGetByUrlRequest = {
      url,
      session,
    };

    const response = await this.useCase.execute(userBookmarkGetByUrlRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/me' + '/' + response.id,
      },
      data: {
        type: 'link',
        session: {
          self: URL_SERVER + '/users/me' + '/' + response.id,
        },
        attributes: response,
        relationships: {},
      },

      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
