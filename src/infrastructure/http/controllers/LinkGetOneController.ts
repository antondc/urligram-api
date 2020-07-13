import { Request, Response } from 'express';

import { ILinkGetOneRequestDTO } from '@domain/link/dto/ILinkGetOneRequestDTO';
import { ILinkGetOneUseCase } from '@domain/link/useCases/LinkGetOneUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LinkGetOneController extends BaseController {
  useCase: ILinkGetOneUseCase;

  constructor(useCase: ILinkGetOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const linkGetOneRequestDTO: ILinkGetOneRequestDTO = {
      id: Number(id),
      session,
    };

    const response = await this.useCase.execute(linkGetOneRequestDTO);

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
