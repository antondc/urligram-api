import { Request, Response } from 'express';

import { IUserFollowingDeleteRequestDTO } from '@domain/user/dto/IUserFollowingDeleteRequestDTO';
import { User } from '@domain/user/entities/User';
import { IUserFollowingDeleteUseCase } from '@domain/user/useCases/UserFollowingDeleteUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserFollowingDeleteController extends BaseController {
  useCase: IUserFollowingDeleteUseCase;

  constructor(useCase: IUserFollowingDeleteUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { followedId } = req.params;

    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const userFollowingCreateDTO: IUserFollowingDeleteRequestDTO = {
      followedId,
      session,
    };

    const response = await this.useCase.execute(userFollowingCreateDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/' + session?.id,
      },
      data: [
        {
          type: 'user',
          session: {
            self: URL_SERVER + '/users/' + session?.id,
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
