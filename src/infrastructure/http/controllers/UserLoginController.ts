import { CookieOptions, Request, Response } from 'express';

import { IUserLoginRequest } from '@domain/user/useCases/interfaces/IUserLoginRequest';
import { IUserLoginUseCase } from '@domain/user/useCases/UserLoginUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { DEVELOPMENT, PRODUCTION, URL_SERVER } from '@shared/constants/env';
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

    const cookieOptions: CookieOptions = {
      maxAge: 24 * 60 * 60 * 1000 * 30, // One month
      httpOnly: true,
      path: '/',
      sameSite: DEVELOPMENT ? 'none' : 'strict',
      secure: DEVELOPMENT ? false : true,
    };

    return res.cookie('sessionToken', token, cookieOptions).json(formattedResponse).end();
  }
}
