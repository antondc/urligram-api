import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserFollowingCreateRequest } from '@domain/user/useCases/interfaces/IUserFollowingCreateRequest';
import { IUserFollowingCreateUseCase } from '@domain/user/useCases/UserFollowingCreateUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserFollowingCreateController extends BaseController {
  useCase: IUserFollowingCreateUseCase;

  constructor(useCase: IUserFollowingCreateUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { followedId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const userFollowingCreateRequest: IUserFollowingCreateRequest = {
      followedId,
      session,
    };
    const response = await this.useCase.execute(userFollowingCreateRequest);

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
