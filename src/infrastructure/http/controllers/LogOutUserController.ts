import { NextFunction, Request, Response } from 'express';

import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { User } from '@domain/user/entities/User';
import { ILogOutUserUseCase } from '@domain/user/useCases/LogOutUserUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';

export class LogOutUserController {
  logOutUserUseCase: ILogOutUserUseCase;

  constructor(logOutUserUseCase: ILogOutUserUseCase) {
    this.logOutUserUseCase = logOutUserUseCase;
  }

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenService = new TokenService();
      const logOutUserRequestDTO: ILogOutUserRequestDTO = tokenService.verifyToken(req.cookies.sessionToken) as User;

      const response = await this.logOutUserUseCase.execute(logOutUserRequestDTO);

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
    } catch (err) {
      return next(err);
    }
  }
}
