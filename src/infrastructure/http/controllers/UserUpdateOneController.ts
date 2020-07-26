import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserUpdateOneRequest } from '@domain/user/useCases/interfaces/IUserUpdateOneRequest';
import { IUserUpdateOneUseCase } from '@domain/user/useCases/UserUpdateOneUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserUpdateOneController extends BaseController {
  useCase: IUserUpdateOneUseCase;

  constructor(useCase: IUserUpdateOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { name, email, statement, location } = req.body;

    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const userUpdateRequest: IUserUpdateOneRequest = {
      session,
      name,
      email,
      statement,
      location,
    };

    const response = await this.useCase.execute(userUpdateRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users',
      },
      data: [
        {
          type: 'link',
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
