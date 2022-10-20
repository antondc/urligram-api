import { TokenJWT } from '@antoniodcorrea/utils';
import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserFollowingCreateRequest } from '@domain/user/useCases/interfaces/IUserFollowingCreateRequest';
import { IUserFollowingCreateUseCase } from '@domain/user/useCases/UserFollowingCreateUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserFollowingCreateController extends BaseController {
  useCase: IUserFollowingCreateUseCase;

  constructor(useCase: IUserFollowingCreateUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { followedId } = req.params;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const userFollowingCreateRequest: IUserFollowingCreateRequest = {
      followedId,
      session,
    };
    const response = await this.useCase.execute(userFollowingCreateRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/users/me' + '/following/' + followedId,
      },
      data: [
        {
          type: 'following',
          session: {
            self: URL_SERVER + PATH_API_V1 + '/users/' + followedId,
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
