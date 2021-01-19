import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserGetAllUseCase } from '@domain/user/useCases/UserGetAllUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserGetAllController extends BaseController {
  useCase: IUserGetAllUseCase;

  constructor(useCase: IUserGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;
    const users = await this.useCase.execute({ session });

    const formattedUsers = users.map((item) => {
      return {
        type: 'user',
        id: item.id,
        session: {
          self: URL_SERVER + '/users/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users',
      },
      data: formattedUsers,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
