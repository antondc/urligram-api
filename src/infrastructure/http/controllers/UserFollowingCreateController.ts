import { Request, Response } from 'express';

import { IUserFollowingCreateRequestDTO } from '@domain/user/dto/IUserFollowingCreateRequestDTO';
import { User } from '@domain/user/entities/User';
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

    const userFollowingCreateDTO: IUserFollowingCreateRequestDTO = {
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
