import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserBookmarkUserUpdateRequest } from '@domain/user/useCases/interfaces/IUserBookmarkUserUpdateRequest';
import { IUserBookmarkUserUpdateUseCase } from '@domain/user/useCases/UserBookmarkUserUpdateUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class UserBookmarkUserUpdateController extends BaseController {
  useCase: IUserBookmarkUserUpdateUseCase;

  constructor(useCase: IUserBookmarkUserUpdateUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { bookmarkId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const userBookmarkUserRequest: IUserBookmarkUserUpdateRequest = {
      bookmarkId: Number(bookmarkId),
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
