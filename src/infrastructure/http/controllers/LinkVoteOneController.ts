import { Request, Response } from 'express';

import { TokenJWT } from '@antoniodcorrea/utils-backend';
import { ILinkVoteOneRequest } from '@domain/link/useCases/interfaces/ILinkVoteOneRequest';
import { ILinkVoteOneUseCase } from '@domain/link/useCases/LinkVoteOneUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
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
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const linkVoteOneRequest: ILinkVoteOneRequest = {
      linkId: Number(linkId),
      session,
      vote,
    };

    const response = await this.useCase.execute(linkVoteOneRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/links',
      },
      data: {
        type: 'link',
        id: response.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/links/' + response.id,
        },
        attributes: response,
      },
    };

    return res.status(200).send(formattedResponse);
  }
}
