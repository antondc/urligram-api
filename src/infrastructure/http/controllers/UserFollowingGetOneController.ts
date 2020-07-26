import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserFollowingGetOneRequest } from '@domain/user/useCases/interfaces/IUserFollowingGetOneRequest';
import { IUserFollowingGetOneUseCase } from '@domain/user/useCases/UserFollowingGetOneUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserFollowingGetOneController extends BaseController {
  useCase: IUserFollowingGetOneUseCase;

  constructor(useCase: IUserFollowingGetOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { followedId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const userFollowingGetOneRequest: IUserFollowingGetOneRequest = {
      session,
      followedId,
    };

    const response = await this.useCase.execute(userFollowingGetOneRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/me' + '/following/' + followedId,
      },
      data: [
        {
          type: 'following',
          session: {
            self: URL_SERVER + '/users/' + followedId,
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
