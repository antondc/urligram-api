import { Request, Response } from 'express';

import { ILinkGetAllRequest } from '@domain/link/useCases/interfaces/ILinkGetAllRequest';
import { ILinkGetAllUseCase } from '@domain/link/useCases/LinkGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URLWrapper } from '@infrastructure/services/UrlWrapper';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

type LinkGetAllControllerQueryType = {
  sort: 'id' | '-id' | 'order' | '-order' | 'count' | '-count';
  page: {
    size: string;
    offset: string;
  };
  filter?: {
    tags?: string;
  };
};

export class LinkGetAllController extends BaseController {
  useCase: ILinkGetAllUseCase;

  constructor(useCase: ILinkGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort, page: { size, offset } = {}, filter: { tags } = {} } = req.query as LinkGetAllControllerQueryType;
    const castedSize = Number(size) || null;
    const castedOffset = Number(offset) || null;
    const parsedTags = tags?.split(',') || null;
    const tokenService = new TokenService();

    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const linkGetAllRequest: ILinkGetAllRequest = {
      session,
      sort,
      size: castedSize,
      offset: castedOffset,
      filter: {
        tags: parsedTags,
      },
    };

    const response = await this.useCase.execute(linkGetAllRequest);

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
