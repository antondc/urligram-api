import { NextFunction, Request, Response } from 'express';

import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILoginUserUseCase } from '@domain/user/useCases/LoginUserUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';

export class LoginUserController {
  loginUserUseCase: ILoginUserUseCase;

  constructor(loginUserUseCase: ILoginUserUseCase) {
    this.loginUserUseCase = loginUserUseCase;
  }

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const loginUserDTO: ILoginUserRequestDTO = req.body;

      const response = await this.loginUserUseCase.execute(loginUserDTO);

      const tokenService = new TokenService();
      const token = tokenService.createToken(response);

      const formattedResponse = {
        links: {
          self: URL_SERVER + '/users/me',
        },
        data: [
          {
            type: 'session',
            id: response.id,
            session: {
              self: URL_SERVER + '/users/me',
            },
            attributes: response,
            relationships: {},
          },
        ],
        included: [],
      };

      return res
        .cookie('sessionToken', token, {
          maxAge: 900000,
          httpOnly: true,
          path: '/',
        })
        .json(formattedResponse)
        .end();
    } catch (err) {
      return next(err);
    }
  }
}
