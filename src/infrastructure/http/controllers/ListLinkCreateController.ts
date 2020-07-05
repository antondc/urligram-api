import { Request, Response } from 'express';

import { IListLinkCreateRequestDTO } from '@domain/list/dto/IListLinkCreateRequestDTO';
import { IListLinkCreateUseCase } from '@domain/list/useCases/ListLinkCreateUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListLinkCreateController extends BaseController {
  useCase: IListLinkCreateUseCase;

  constructor(useCase: IListLinkCreateUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id, linkId } = req.params;

    const listLinkCreateUseCase: IListLinkCreateRequestDTO = {
      listId: Number(id),
      linkId: Number(linkId),
    };

    const response = await this.useCase.execute(listLinkCreateUseCase);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/lists/' + id,
      },
      data: [
        {
          type: 'user',
          session: {
            self: URL_SERVER + '/lists/' + id + '/links/' + linkId,
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
