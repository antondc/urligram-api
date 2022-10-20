import { TokenJWT } from '@antoniodcorrea/utils';
import { Request, Response } from 'express';

import { LinkUsersGetAllUseCase } from '@domain/link/useCases/LinkUsersGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

const DEFAULT_USER_GET_ALL_SORT = '-updatedAt';

type LinkUsersGetAllControllerQueryType = {
  sort?: 'order' | '-order' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  page: {
    size: string;
    offset: string;
  };
};

export class LinkUsersGetAllController extends BaseController {
  useCase: LinkUsersGetAllUseCase;

  constructor(useCase: LinkUsersGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort = DEFAULT_USER_GET_ALL_SORT, page: { size, offset } = {} } = req.query as LinkUsersGetAllControllerQueryType;
    const { linkId } = req.params;

    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);
    const castedLinkId = Number(linkId);
    const castedSort = sort || undefined;
    const castedSize = Number(size) || DEFAULT_PAGE_SIZE;
    const castedOffset = Number(offset) || undefined;

    const { users, meta } = await this.useCase.execute({
      session,
      linkId: castedLinkId,
      sort: castedSort,
      size: castedSize,
      offset: castedOffset,
    });

    const formattedUsers = users.map((item) => {
      return {
        type: 'user',
        id: item.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/users/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      meta,
      links: {
        self: URL_SERVER + PATH_API_V1 + req.originalUrl,
      },
      data: formattedUsers,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
