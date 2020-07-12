import { Request, Response } from 'express';

import { IListUserGetOneRequestDTO } from '@domain/list/dto/IListUserGetOneRequestDTO';
import { IListUserGetOneUseCase } from '@domain/list/useCases/ListUserGetOneUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUserGetOneController extends BaseController {
  useCase: IListUserGetOneUseCase;

  constructor(useCase: IListUserGetOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id, userId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const listUserGetOneDTO: IListUserGetOneRequestDTO = {
      listId: Number(id),
      userId: userId,
      session,
    };

    const response = await this.useCase.execute(listUserGetOneDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/lists/' + id + '/users/' + userId,
      },
      data: [
        {
          type: 'user',
          session: {
            self: URL_SERVER + '/users/' + userId,
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
