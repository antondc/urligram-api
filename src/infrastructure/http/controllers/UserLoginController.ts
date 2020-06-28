import { Request, Response } from 'express';

import { IUserLoginRequestDTO } from '@domain/user/dto/IUserLoginRequestDTO';
import { IUserLoginUseCase } from '@domain/user/useCases/UserLoginUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserLoginController extends BaseController {
  useCase: IUserLoginUseCase;

  constructor(useCase: IUserLoginUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const userLoginDTO: IUserLoginRequestDTO = req.body;

    const response = await this.useCase.execute(userLoginDTO);

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
  }
}
