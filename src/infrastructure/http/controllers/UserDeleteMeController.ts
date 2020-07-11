import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserDeleteMeUseCase } from '@domain/user/useCases/UserDeleteMeUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserDeleteMeController extends BaseController {
  useCase: IUserDeleteMeUseCase;

  constructor(useCase: IUserDeleteMeUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const tokenService = new TokenService();
    const token = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const userDeleteMeRequestDTO = {
      id: token?.id,
    };

    const response = await this.useCase.execute(userDeleteMeRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users',
      },
      data: [
        {
          type: 'user',
          id: response?.id,
          session: {
            self: URL_SERVER + '/users' + token.id,
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
