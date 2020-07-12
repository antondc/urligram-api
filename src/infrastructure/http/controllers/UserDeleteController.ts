import { Request, Response } from 'express';

import { IUserDeleteRequestDTO } from '@domain/user/dto/IUserDeleteRequestDTO';
import { User } from '@domain/user/entities/User';
import { IUserDeleteUseCase } from '@domain/user/useCases/UserDeleteUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserDeleteController extends BaseController {
  useCase: IUserDeleteUseCase;

  constructor(useCase: IUserDeleteUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const userDeleteRequestDTO: IUserDeleteRequestDTO = {
      session,
    };

    const response = await this.useCase.execute(userDeleteRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users',
      },
      data: [
        {
          type: 'user',
          id: response?.id,
          session: {
            self: URL_SERVER + '/users' + session?.id,
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
