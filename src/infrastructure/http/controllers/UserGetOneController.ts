import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserGetOneRequest } from '@domain/user/useCases/interfaces/IUserGetOneRequest';
import { IUserGetOneUseCase } from '@domain/user/useCases/UserGetOneUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserGetOneController extends BaseController {
  useCase: IUserGetOneUseCase;

  constructor(useCase: IUserGetOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { userId, name, email } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const userGetOneRequest: IUserGetOneRequest = {
      userId,
      name,
      email,
      session,
    };
    const response = await this.useCase.execute(userGetOneRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/' + userId,
      },
      data: {
        type: 'user',
        session: {
          self: URL_SERVER + '/users/' + userId,
        },
        id: response?.id,
        attributes: response,
        relationships: {},
      },
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
