import { Request, Response } from 'express';

import { ILinkDeleteRequestDTO } from '@domain/link/dto/ILinkDeleteRequestDTO';
import { ILinkDeleteUseCase } from '@domain/link/useCases/LinkDeleteUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LinkDeleteController extends BaseController {
  useCase: ILinkDeleteUseCase;

  constructor(useCase: ILinkDeleteUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;

    const linkDeleteRequestDTO: ILinkDeleteRequestDTO = {
      id: Number(id),
    };

    const response = await this.useCase.execute(linkDeleteRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/link',
      },
      data: [
        {
          type: 'link',
          id: response,
          session: {
            self: URL_SERVER + '/link',
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
