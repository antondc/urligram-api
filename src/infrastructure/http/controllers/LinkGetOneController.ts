import { Request, Response } from 'express';

import { ILinkGetOneRequest } from '@domain/link/useCases/interfaces/ILinkGetOneRequest';
import { ILinkGetOneUseCase } from '@domain/link/useCases/LinkGetOneUseCase';
import { User } from '@domain/user/entities/User';
import { URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class LinkGetOneController extends BaseController {
  useCase: ILinkGetOneUseCase;

  constructor(useCase: ILinkGetOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { linkId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const linkGetOneRequest: ILinkGetOneRequest = {
      linkId: Number(linkId),
      session,
    };

    const response = await this.useCase.execute(linkGetOneRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/links',
      },
      data: [
        {
          type: 'link',
          id: response.id,
          session: {
            self: URL_SERVER + '/links/' + response.id,
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
