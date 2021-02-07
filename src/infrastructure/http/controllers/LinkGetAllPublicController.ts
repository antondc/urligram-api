import { Request, Response } from 'express';

import { ILinkGetAllPublicRequest } from '@domain/link/useCases/interfaces/ILinkGetAllPublicRequest';
import { ILinkGetAllPublicUseCase } from '@domain/link/useCases/LinkGetAllPublicUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URLWrapper } from '@infrastructure/services/UrlWrapper';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

type LinkGetAllPublicControllerQueryType = {
  sort: 'id' | '-id' | 'order' | '-order' | 'count' | '-count';
  page: {
    size: string;
    offset: string;
  };
};

export class LinkGetAllPublicController extends BaseController {
  useCase: ILinkGetAllPublicUseCase;

  constructor(useCase: ILinkGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort, page: { size, offset } = {} } = req.query as LinkGetAllPublicControllerQueryType;
    const castedSize = Number(size) || null;
    const castedOffset = Number(offset) || null;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const linkGetAllPublicRequest: ILinkGetAllPublicRequest = {
      session,
      sort,
      size: castedSize,
      offset: castedOffset,
    };

    const response = await this.useCase.execute(linkGetAllPublicRequest);

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
      Links: {
        self: URL_SERVER + '/links',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
