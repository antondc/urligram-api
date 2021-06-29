import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserBookmarkUserReceivedGetAllRequest } from '@domain/user/useCases/interfaces/IUserBookmarkUserReceivedGetAllRequest';
import { IUserBookmarkUserReceivedGetAllUseCase } from '@domain/user/useCases/UserBookmarkUserReceivedGetAllUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class UserBookmarkUserReceivedGetAllController extends BaseController {
  useCase: IUserBookmarkUserReceivedGetAllUseCase;

  constructor(useCase: IUserBookmarkUserReceivedGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const userBookmarkUserRequest: IUserBookmarkUserReceivedGetAllRequest = {
      session,
    };

    const bookmarks = await this.useCase.execute(userBookmarkUserRequest);

    const formattedBookmarks = bookmarks.map((item) => {
      return {
        type: 'link',
        id: item.bookmarkId,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/bookmarks/' + item.bookmarkId,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/users/me' + '/',
      },
      data: formattedBookmarks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
