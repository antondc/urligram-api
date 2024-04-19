import { Request, Response } from 'express';

import { TokenJWT } from '@antoniodcorrea/utils-backend';
import { ILinkNotesGetAllPublicRequest } from '@domain/link/useCases/interfaces/ILinkNotesGetAllPublicRequest';
import { ILinkNotesGetAllPublicUseCase } from '@domain/link/useCases/LinkNotesGetAllPublicUseCase';
import { User } from '@domain/user/entities/User';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { JWT_SECRET, PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

const DEFAULT_NOTES_GET_ALL_SORT = '-updatedAt';

type LinkNotesGetAllControllerQueryType = {
  sort?: 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  page: {
    size: string;
    offset: string;
  };
};

export class LinkNotesGetAllController extends BaseController {
  useCase: ILinkNotesGetAllPublicUseCase;

  constructor(useCase: ILinkNotesGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort = DEFAULT_NOTES_GET_ALL_SORT, page: { size, offset } = {} } = req.query as LinkNotesGetAllControllerQueryType;
    const { linkId } = req.params;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const castedSort = sort || undefined;
    const castedSize = Number(size) || DEFAULT_PAGE_SIZE;
    const castedOffset = Number(offset) || undefined;

    const linkLinkGetAllRequest: ILinkNotesGetAllPublicRequest = {
      session,
      linkId: Number(linkId),
      sort: castedSort,
      size: castedSize,
      offset: castedOffset,
    };

    const { notes, meta } = await this.useCase.execute(linkLinkGetAllRequest);

    const formattedLinks = notes.map((item) => {
      return {
        type: 'notes',
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      meta,
      links: {
        self: URL_SERVER + PATH_API_V1 + '/links/' + linkId + '/notes',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
