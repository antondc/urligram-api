import { Request, Response } from 'express';

import { ILinkGetAllRequest } from '@domain/link/useCases/interfaces/ILinkGetAllRequest';
import { ILinkGetAllUseCase } from '@domain/link/useCases/LinkGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URLWrapper } from '@infrastructure/services/UrlWrapper';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

const DEFAULT_LINK_GET_ALL_SORT = '-last-bookmarked';

type LinkGetAllControllerQueryType = {
  sort: 'order' | '-order' | 'most-bookmarked' | '-most-bookmarked' | 'created' | '-created' | 'vote' | '-vote' | 'last-bookmarked' | '-last-bookmarked';
  page: {
    size: string;
    offset: string;
  };
  filter?: {
    tags?: string[];
  };
};

export class LinkGetAllController extends BaseController {
  useCase: ILinkGetAllUseCase;

  constructor(useCase: ILinkGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort = DEFAULT_LINK_GET_ALL_SORT, page: { size, offset } = {}, filter: { tags } = {} } = req.query as LinkGetAllControllerQueryType;
    const castedSize = Number(size) || DEFAULT_PAGE_SIZE;
    const castedOffset = Number(offset) || null;
    const tokenService = new TokenService();

    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const linkGetAllRequest: ILinkGetAllRequest = {
      session,
      sort,
      size: castedSize,
      offset: castedOffset,
      filter: {
        tags,
      },
    };

    const { links, meta } = await this.useCase.execute(linkGetAllRequest);

    const formattedLinks = links.map((item) => {
      const urlWrapper = new URLWrapper(item.url);
      const url = urlWrapper.getHref();

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
      meta,
      Links: {
        self: URL_SERVER + '/links',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
