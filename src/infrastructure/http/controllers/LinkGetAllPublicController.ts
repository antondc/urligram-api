import { Request, Response } from 'express';

import { ILinkGetAllPublicRequest } from '@domain/link/useCases/interfaces/ILinkGetAllPublicRequest';
import { ILinkGetAllPublicUseCase } from '@domain/link/useCases/LinkGetAllPublicUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URLWrapper } from '@infrastructure/services/UrlWrapper';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LinkGetAllPublicController extends BaseController {
  useCase: ILinkGetAllPublicUseCase;

  constructor(useCase: ILinkGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const linkGetAllPublicRequestDTO: ILinkGetAllPublicRequest = {
      session,
    };

    const response = await this.useCase.execute(linkGetAllPublicRequestDTO);

    const formattedLinks = response.map((item) => {
      const urlWrapper = new URLWrapper(item.url);
      const url = urlWrapper.getUrl();

      return {
        type: 'link',
        id: item.id,
        session: {
          self: URL_SERVER + '/links/' + item.id,
        },
        attributes: {
          ...item,
          url,
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
