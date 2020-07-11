import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
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
    const token = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const listUserUpdateRequestDTO = {
      id: token?.id,
    };

    const response = await this.useCase.execute(listUserUpdateRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/login',
      },
      data: [
        {
          type: 'session',
          id: response.id,
          login: {
            self: URL_SERVER + '/login',
          },
          attributes: {
            id: response.id,
          },
          relationships: {},
        },
      ],
      included: [],
    };

    return res.clearCookie('sessionToken', { path: '/' }).status(205).send(formattedResponse);
  }
}
