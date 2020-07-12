import { Request, Response } from 'express';

import { IListCreateRequestDTO } from '@domain/list/dto/IListCreateRequestDTO';
import { IListCreateUseCase } from '@domain/list/useCases/ListCreateUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListCreateController extends BaseController {
  useCase: IListCreateUseCase;

  constructor(useCase: IListCreateUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { userId, name, description, isPrivate, listType } = req.body;

    const listCreateRequestDTO: IListCreateRequestDTO = {
      userId,
      name,
      description,
      isPrivate,
      listType,
    };

    const response = await this.useCase.execute(listCreateRequestDTO);

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
