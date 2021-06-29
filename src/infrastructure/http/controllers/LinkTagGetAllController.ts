import { Request, Response } from 'express';

import { ILinkTagGetAllRequest } from '@domain/link/useCases/interfaces/ILinkTagGetAllRequest';
import { ILinkTagGetAllUseCase } from '@domain/link/useCases/LinkTagGetAllPublicUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
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
        self: URL_SERVER + PATH_API_V1 + '/links/' + linkId + '/tags',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
