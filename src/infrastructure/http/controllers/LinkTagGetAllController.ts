import { Request, Response } from 'express';

import { ILinkTagGetAllRequest } from '@domain/link/useCases/interfaces/ILinkTagGetAllRequest';
import { ILinkTagGetAllUseCase } from '@domain/link/useCases/LinkTagGetAllPublicUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LinkTagGetAllController extends BaseController {
  useCase: ILinkTagGetAllUseCase;

  constructor(useCase: ILinkTagGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { linkId } = req.params;

    const linkLinkGetAllRequest: ILinkTagGetAllRequest = {
      linkId: Number(linkId),
    };

    const response = await this.useCase.execute(linkLinkGetAllRequest);

    const formattedLinks = response.map((item) => {
      return {
        type: 'tag',
        id: item.id,
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/links/' + linkId + '/tags',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
