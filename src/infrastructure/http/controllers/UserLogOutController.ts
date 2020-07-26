import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserLogoutRequest } from '@domain/user/useCases/interfaces/UserLogOutRequest';
import { IUserLogOutUseCase } from '@domain/user/useCases/UserLogOutUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserLogOutController extends BaseController {
  useCase: IUserLogOutUseCase;

  constructor(useCase: IUserLogOutUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const listUserLogOutRequest: IUserLogoutRequest = {
      session,
    };

    const response = await this.useCase.execute(listUserLogOutRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/login',
      },
      data: [
        {
          type: 'session',
          id: response.session?.id,
          login: {
            self: URL_SERVER + '/login',
          },
          attributes: {
            id: response.session?.id,
          },
          relationships: {},
        },
      ],
      included: [],
    };

    return res.clearCookie('sessionToken', { path: '/' }).status(205).send(formattedResponse);
  }
}
