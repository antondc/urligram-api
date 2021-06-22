import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserBookmarkUserCreateRequest } from '@domain/user/useCases/interfaces/IUserBookmarkUserCreateRequest';
import { IUserBookmarkUserCreateUseCase } from '@domain/user/useCases/UserBookmarkUserCreateUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class UserBookmarkUserCreateController extends BaseController {
  useCase: IUserBookmarkUserCreateUseCase;

  constructor(useCase: IUserBookmarkUserCreateUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { bookmarkId, userId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const userBookmarkUserRequest: IUserBookmarkUserCreateRequest = {
      bookmarkId: Number(bookmarkId),
      userId,
      session,
    };

    const response = await this.useCase.execute(userBookmarkUserRequest);

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
