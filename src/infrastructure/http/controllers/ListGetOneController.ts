import { Request, Response } from 'express';

import { IListGetOneUseCase } from '@domain/list/useCases/ListGetOneUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListGetOneController extends BaseController {
  useCase: IListGetOneUseCase;

  constructor(useCase: IListGetOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id, name, listType } = req.params;

    const listGetOneRequestDTO = {
      id: Number(id),
      listType: listType,
      name,
    };

    const response = await this.useCase.execute(listGetOneRequestDTO);

    const formattedResponse = {
      lists: {
        self: URL_SERVER + '/lists',
      },
      data: [
        {
          type: 'list',
          id: response.id,
          session: {
            self: URL_SERVER + '/lists/' + response.id,
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
