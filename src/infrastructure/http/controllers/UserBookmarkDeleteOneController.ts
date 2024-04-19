import { Request, Response } from 'express';

import { TokenJWT } from '@antoniodcorrea/utils-backend';
import { User } from '@domain/user/entities/User';
import { IUserBookmarkDeleteOneRequest } from '@domain/user/useCases/interfaces/IUserBookmarkDeleteOneRequest';
import { IUserBookmarkDeleteOneUseCase } from '@domain/user/useCases/UserBookmarkDeleteOneUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserBookmarkDeleteOneController extends BaseController {
  useCase: IUserBookmarkDeleteOneUseCase;

  constructor(useCase: IUserBookmarkDeleteOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { bookmarkId } = req.params;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const userBookmarkDeleteOneReques: IUserBookmarkDeleteOneRequest = {
      bookmarkId: Number(bookmarkId),
      session,
    };
    const response = await this.useCase.execute(userBookmarkDeleteOneReques);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/users/me/bookmarks/' + bookmarkId,
      },
      data: {
        type: 'bookmark',
        id: response,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/users/me/bookmarks/' + bookmarkId,
        },
        attributes: response,
        relationships: {},
      },
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
