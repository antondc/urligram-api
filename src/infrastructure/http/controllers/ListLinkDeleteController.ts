import { Request, Response } from 'express';

import { IListLinkDeleteRequestDTO } from '@domain/list/dto/IListLinkDeleteRequestDTO';
import { IListLinkDeleteUseCase } from '@domain/list/useCases/ListLinkDeleteUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListLinkDeleteController extends BaseController {
  useCase: IListLinkDeleteUseCase;

  constructor(useCase: IListLinkDeleteUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id, linkId } = req.params;

    const listLinkDeleteUseCase: IListLinkDeleteRequestDTO = {
      listId: Number(id),
      linkId: Number(linkId),
    };

    const response = await this.useCase.execute(listLinkDeleteUseCase);

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
