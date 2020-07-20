import { Request, Response } from 'express';

import { ILinkListGetAllRequest } from '@domain/link/useCases/interfaces/ILinkListGetAllRequest';
import { ILinkListGetAllUseCase } from '@domain/link/useCases/LinkListGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LinkListGetAllController extends BaseController {
  useCase: ILinkListGetAllUseCase;

  constructor(useCase: ILinkListGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { linkId } = req.params;

    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const linkListGetOneRequest: ILinkListGetAllRequest = {
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
