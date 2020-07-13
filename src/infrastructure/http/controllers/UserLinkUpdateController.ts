import { Request, Response } from 'express';

import { IUserLinkUpdateRequestDTO } from '@domain/user/dto/IUserLinkUpdateRequestDTO';
import { User } from '@domain/user/entities/User';
import { IUserLinkUpdateUseCase } from '@domain/user/useCases/UserLinkUpdateUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserLinkUpdateController extends BaseController {
  useCase: IUserLinkUpdateUseCase;

  constructor(useCase: IUserLinkUpdateUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { vote, order, saved, isPrivate, url, tags } = req.body;
    const { linkId } = req.params;

    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const linkUpdateRequestDTO: IUserLinkUpdateRequestDTO = {
      linkId: Number(linkId),
      order,
      vote,
      saved,
      isPrivate,
      url,
      tags,
      session,
    };

    const response = await this.useCase.execute(linkUpdateRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/link',
      },
      data: [
        {
          type: 'link',
          id: response?.id,
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
