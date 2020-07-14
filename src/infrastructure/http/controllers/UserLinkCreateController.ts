import { Request, Response } from 'express';

import { IUserLinkCreateRequestDTO } from '@domain/user/dto/IUserLinkCreateRequestDTO';
import { User } from '@domain/user/entities/User';
import { IUserLinkCreateUseCase } from '@domain/user/useCases/UserLinkCreateUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserLinkCreateController extends BaseController {
  useCase: IUserLinkCreateUseCase;

  constructor(useCase: IUserLinkCreateUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { title, vote, saved, isPrivate, url, tags } = req.body;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const linkCreateRequestDTO: IUserLinkCreateRequestDTO = {
      title,
      vote,
      saved,
      isPrivate,
      url,
      tags,
      session,
    };

    const response = await this.useCase.execute(linkCreateRequestDTO);

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
