import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserBookmarkGetOneRequest } from '@domain/user/useCases/interfaces/IUserBookmarkGetOneRequest';
import { IUserBookmarkGetOneUseCase } from '@domain/user/useCases/UserBookmarkGetOneUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserBookmarkGetOneController extends BaseController {
  useCase: IUserBookmarkGetOneUseCase;

  constructor(useCase: IUserBookmarkGetOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { bookmarkId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const userBookmarkGetOneRequest: IUserBookmarkGetOneRequest = {
      bookmarkId: Number(bookmarkId),
      session,
    };

    const response = await this.useCase.execute(userBookmarkGetOneRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/me' + '/' + bookmarkId,
      },
      data: [
        {
          type: 'link',
          session: {
            self: URL_SERVER + '/users/me' + '/' + bookmarkId,
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
