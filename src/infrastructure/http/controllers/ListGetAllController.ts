import { Request, Response } from 'express';

import { IListGetAllUseCase } from '@domain/list/useCases/ListGetAllUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListGetAllController extends BaseController {
  useCase: IListGetAllUseCase;

  constructor(useCase: IListGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const response = await this.useCase.execute();

    const formattedLists = response.map((item) => {
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
      lists: {
        self: URL_SERVER + '/list',
      },
      data: formattedLists,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
