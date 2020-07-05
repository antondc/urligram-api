import { Request, Response } from 'express';

import { IListUserGetAllRequestDTO } from '@domain/list/dto/IListUserGetAllRequestDTO';
import { IListUserGetAllUseCase } from '@domain/list/useCases/ListUserGetAllUseCase';
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

    const listDeleteRequestDTO: IListUserGetAllRequestDTO = {
      listId: Number(id),
    };

    const response = await this.useCase.execute(listDeleteRequestDTO);

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
