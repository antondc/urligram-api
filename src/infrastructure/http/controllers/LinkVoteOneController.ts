import { Request, Response } from 'express';

import { ILinkVoteOneRequest } from '@domain/link/useCases/interfaces/ILinkVoteOneRequest';
import { ILinkVoteOneUseCase } from '@domain/link/useCases/LinkVoteOneUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LinkVoteOneController extends BaseController {
  useCase: ILinkVoteOneUseCase;

  constructor(useCase: ILinkVoteOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { linkId } = req.params;
    const { vote } = req.body;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const linkVoteOneRequest: ILinkVoteOneRequest = {
      linkId: Number(linkId),
      session,
      vote,
    };

    const response = await this.useCase.execute(linkVoteOneRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/links',
      },
      data: {
        type: 'link',
        id: response.id,
        session: {
          self: URL_SERVER + '/links/' + response.id,
        },
        attributes: response,
      },
    };

    return res.status(200).send(formattedResponse);
  }
}
