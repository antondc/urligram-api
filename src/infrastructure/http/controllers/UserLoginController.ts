import { CookieOptions, Request, Response } from 'express';

import { IUserLoginRequest } from '@domain/user/useCases/interfaces/IUserLoginRequest';
import { IUserLoginUseCase } from '@domain/user/useCases/UserLoginUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { DEVELOPMENT, PRODUCTION, STAGING, URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserLoginController extends BaseController {
  useCase: IUserLoginUseCase;

  constructor(useCase: IUserLoginUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { name, password } = req.body;

    const userLoginRequest: IUserLoginRequest = {
      name,
      password,
    };
    const response = await this.useCase.execute(userLoginRequest);

    const tokenService = new TokenService();
    const token = tokenService.createToken(response);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/me',
      },
      data: {
        type: 'session',
        id: response.id,
        session: {
          self: URL_SERVER + '/users/me',
        },
        attributes: response,
        relationships: {},
      },
      included: [],
    };

    return res
      .cookie('sessionToken', token, {
        maxAge: 24 * 60 * 60 * 1000 * 30, // One month
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
      })
      .json(formattedResponse)
      .end();
  }
}
