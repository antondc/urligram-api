import { Request, Response } from 'express';

import { ILinkGetAllRequestDTO } from '@domain/link/dto/ILinkGetAllRequestDTO';
import { ILinkGetAllUseCase } from '@domain/link/useCases/LinkGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LinkGetAllController extends BaseController {
  useCase: ILinkGetAllUseCase;

  constructor(useCase: ILinkGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const linkGetAllRequestDTO: ILinkGetAllRequestDTO = {
      session,
    };

    const response = await this.useCase.execute(linkGetAllRequestDTO);

    const formattedLinks = response.map((item) => {
      return {
        type: 'link',
        id: item.id,
        session: {
          self: URL_SERVER + '/links/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/links',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
