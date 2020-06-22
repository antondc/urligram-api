import { Request, Response } from 'express';

import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { User } from '@domain/user/entities/User';
import { ILogOutUserUseCase } from '@domain/user/useCases/LogOutUserUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LogOutUserController extends BaseController {
  useCase: ILogOutUserUseCase;

  constructor(useCase: ILogOutUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const tokenService = new TokenService();
    const logOutUserRequestDTO: ILogOutUserRequestDTO = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const response = await this.useCase.execute(logOutUserRequestDTO);

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
