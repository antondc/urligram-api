import { Request, Response } from 'express';

import { IUserLinkGetOneRequestDTO } from '@domain/user/dto/IUserLinkGetOneRequestDTO';
import { User } from '@domain/user/entities/User';
import { IUserLinkGetOneUseCase } from '@domain/user/useCases/UserLinkGetOneUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserLinkGetOneController extends BaseController {
  useCase: IUserLinkGetOneUseCase;

  constructor(useCase: IUserLinkGetOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { linkId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const userLinkGetOneRequestDTO: IUserLinkGetOneRequestDTO = {
      linkId: Number(linkId),
      session,
    };

    const response = await this.useCase.execute(userLinkGetOneRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/me' + '/' + linkId,
      },
      data: [
        {
          type: 'link',
          session: {
            self: URL_SERVER + '/users/me' + '/' + linkId,
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
