import { Request, Response } from 'express';

import { TokenJWT } from '@antoniodcorrea/utils-backend';
import { User } from '@domain/user/entities/User';
import { IUserBookmarkGetOneRequest } from '@domain/user/useCases/interfaces/IUserBookmarkGetOneRequest';
import { IUserBookmarkGetOneUseCase } from '@domain/user/useCases/UserBookmarkGetOneUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserBookmarkGetOneController extends BaseController {
  useCase: IUserBookmarkGetOneUseCase;

  constructor(useCase: IUserBookmarkGetOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { bookmarkId } = req.params;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const userBookmarkGetOneRequest: IUserBookmarkGetOneRequest = {
      bookmarkId: Number(bookmarkId),
      session,
    };

    const response = await this.useCase.execute(userBookmarkGetOneRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/users/me' + '/' + bookmarkId,
      },
      data: [
        {
          type: 'link',
          session: {
            self: URL_SERVER + PATH_API_V1 + '/users/me' + '/' + bookmarkId,
          },
          attributes: response,
          relationships: {},
        },
      ],
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
