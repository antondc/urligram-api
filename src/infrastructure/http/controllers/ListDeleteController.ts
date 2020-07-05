import { Request, Response } from 'express';

import { IListDeleteRequestDTO } from '@domain/list/dto/IListDeleteRequestDTO';
import { IListDeleteUseCase } from '@domain/list/useCases/ListDeleteUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListDeleteController extends BaseController {
  useCase: IListDeleteUseCase;

  constructor(useCase: IListDeleteUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;

    const listDeleteRequestDTO: IListDeleteRequestDTO = {
      id: Number(id),
    };

    const response = await this.useCase.execute(listDeleteRequestDTO);

    const formattedResponse = {
      lists: {
        self: URL_SERVER + '/list',
      },
      data: [
        {
          type: 'list',
          id: response,
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
