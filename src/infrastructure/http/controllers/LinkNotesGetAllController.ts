import { Request, Response } from 'express';

import { ILinkNotesGetAllPublicRequest } from '@domain/link/useCases/interfaces/ILinkNotesGetAllPublicRequest';
import { ILinkNotesGetAllPublicUseCase } from '@domain/link/useCases/LinkNotesGetAllPublicUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LinkNotesGetAllController extends BaseController {
  useCase: ILinkNotesGetAllPublicUseCase;

  constructor(useCase: ILinkNotesGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { linkId } = req.params;

    const linkLinkGetAllRequest: ILinkNotesGetAllPublicRequest = {
      linkId: Number(linkId),
    };

    const response = await this.useCase.execute(linkLinkGetAllRequest);

    const formattedLinks = response.map((item) => {
      return {
        type: 'notes',
        id: null,
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/links/' + linkId + '/notes',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
