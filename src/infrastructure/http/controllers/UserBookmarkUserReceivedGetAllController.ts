import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserBookmarkUserReceivedGetAllRequest } from '@domain/user/useCases/interfaces/IUserBookmarkUserReceivedGetAllRequest';
import { IUserBookmarkUserReceivedGetAllUseCase } from '@domain/user/useCases/UserBookmarkUserReceivedGetAllUseCase';
import { URL_SERVER } from '@shared/constants/env';
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

    const response = await this.useCase.execute(userBookmarkUserRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/me' + '/',
      },
      data: [
        {
          type: 'link',
          session: {
            self: URL_SERVER + '/users/me' + '/',
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
