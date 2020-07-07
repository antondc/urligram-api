import { Request, Response } from 'express';

import { IListUserGetOneRequestDTO } from '@domain/list/dto/IListUserGetOneRequestDTO';
import { IListUserGetOneUseCase } from '@domain/list/useCases/ListUserGetOneUseCase';
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

    const listUserGetOneUseCase: IListUserGetOneRequestDTO = {
      listId: Number(id),
      userId: userId,
    };

    const response = await this.useCase.execute(listUserGetOneUseCase);

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
