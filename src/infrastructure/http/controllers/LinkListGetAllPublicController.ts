import { Request, Response } from 'express';

import { ILinkListGetAllPublicRequest } from '@domain/link/useCases/interfaces/ILinkListGetAllPublicRequest';
import { ILinkListGetAllPublicUseCase } from '@domain/link/useCases/LinkListGetAllPublicUseCase';
import { User } from '@domain/user/entities/User';
import { URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class LinkListGetAllPublicController extends BaseController {
  useCase: ILinkListGetAllPublicUseCase;

  constructor(useCase: ILinkListGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { linkId } = req.params;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const linkListGetOneRequest: ILinkListGetAllPublicRequest = {
      linkId: Number(linkId),
      session,
    };

    const response = await this.useCase.execute(linkListGetOneRequest);

    const formattedLinks = response.map((item) => {
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
      links: {
        self: URL_SERVER + '/links/' + linkId + '/lists',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
