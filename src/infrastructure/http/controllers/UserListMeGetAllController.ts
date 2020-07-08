import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserListMeGetAllUseCase } from '@domain/user/useCases/UserListMeGetAllUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserListMeGetAllController extends BaseController {
  useCase: IUserListMeGetAllUseCase;

  constructor(useCase: IUserListMeGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const tokenService = new TokenService();
    const { id } = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const response = await this.useCase.execute({ userId: id });

    const formattedLinks = response.map((item) => {
      return {
        type: 'list',
        id: item.id,
        session: {
          self: URL_SERVER + '/lists/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/lists',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
