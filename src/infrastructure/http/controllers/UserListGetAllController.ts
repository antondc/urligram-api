import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserListGetAllRequest } from '@domain/user/useCases/interfaces/IUserListGetAllRequest';
import { IUserListGetAllUseCase } from '@domain/user/useCases/UserListGetAllUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserListGetAllController extends BaseController {
  useCase: IUserListGetAllUseCase;

  constructor(useCase: IUserListGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { userId } = req.params;

    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const userListGetAllRequest: IUserListGetAllRequest = {
      userId,
      session,
    };

    const response = await this.useCase.execute(userListGetAllRequest);

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
        self: URL_SERVER + '/users/' + userId + '/lists',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
