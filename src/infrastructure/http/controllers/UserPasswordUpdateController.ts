import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserPasswordUpdateRequest } from '@domain/user/useCases/interfaces/IUserPasswordUpdateRequest';
import { IUserPasswordUpdateUseCase } from '@domain/user/useCases/UserPasswordUpdateUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserPasswordUpdateController extends BaseController {
  useCase: IUserPasswordUpdateUseCase;

  constructor(useCase: IUserPasswordUpdateUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { password, newPassword, newPasswordRepeated } = req.body;

    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const userPasswordUpdateRequest: IUserPasswordUpdateRequest = {
      session,
      password,
      newPassword,
      newPasswordRepeated,
    };

    const response = await this.useCase.execute(userPasswordUpdateRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users',
      },
      data: [
        {
          type: 'user',
          id: response?.id,
          session: {
            self: URL_SERVER + '/users' + response.id,
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
