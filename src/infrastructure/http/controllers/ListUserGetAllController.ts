import { Request, Response } from 'express';

import { IListUserGetAllRequestDTO } from '@domain/list/dto/IListUserGetAllRequestDTO';
import { IListUserGetAllUseCase } from '@domain/list/useCases/ListUserGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUserGetAllController extends BaseController {
  useCase: IListUserGetAllUseCase;

  constructor(useCase: IListUserGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;
    const tokenService = new TokenService();

    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const listUserGetAllRequestDTO: IListUserGetAllRequestDTO = {
      listId: Number(id),
      session,
    };

    const response = await this.useCase.execute(listUserGetAllRequestDTO);

    const formattedUsers = response.map((item) => {
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
        self: URL_SERVER + '/lists/' + id + '/users',
      },
      data: formattedUsers,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
