import { Request, Response } from 'express';

import { IListUpdateRequestDTO } from '@domain/list/dto/IListUpdateRequestDTO';
import { IListUpdateUseCase } from '@domain/list/useCases/ListUpdateUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUpdateController extends BaseController {
  useCase: IListUpdateUseCase;

  constructor(useCase: IListUpdateUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;
    const { userId, name, description, isPrivate, listType } = req.body;

    const listUpdateRequestDTO: IListUpdateRequestDTO = {
      id: Number(id),
      userId,
      name,
      description,
      isPrivate,
      listType: listType,
    };

    const response = await this.useCase.execute(listUpdateRequestDTO);

    const formattedResponse = {
      lists: {
        self: URL_SERVER + '/list',
      },
      data: [
        {
          type: 'list',
          id: response?.id,
          session: {
            self: URL_SERVER + '/list',
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
