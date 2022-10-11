import { Request, Response } from 'express';

import { ILinkUsersGetAllPublicRequest } from '@domain/link/useCases/interfaces/ILinkUsersGetAllPublicRequest';
import { ILinkUsersGetAllPublicUseCase } from '@domain/link/useCases/LinkUsersGetAllPublicUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LinkUsersGetAllController extends BaseController {
  useCase: ILinkUsersGetAllPublicUseCase;

  constructor(useCase: ILinkUsersGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { linkId } = req.params;

    const linkLinkGetAllRequest: ILinkUsersGetAllPublicRequest = {
      linkId: Number(linkId),
    };

    const response = await this.useCase.execute(linkLinkGetAllRequest);

    const formattedLinks = response.map((item) => {
      return {
        type: 'user',
        id: item?.id,
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/links/' + linkId + '/users',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
