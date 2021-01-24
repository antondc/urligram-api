import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserBookmarkGetAllRequest } from '@domain/user/useCases/interfaces/IUserBookmarkGetAllRequest';
import { IUserBookmarkGetAllUseCase } from '@domain/user/useCases/UserBookmarkGetAllUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

type BookmarkGetAllPublicControllerQueryType = {
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  page: {
    size: string;
    offset: string;
  };
};

export class UserBookmarkGetAllController extends BaseController {
  useCase: IUserBookmarkGetAllUseCase;

  constructor(useCase: IUserBookmarkGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { userId } = req.params;
    const { sort, page: { size, offset } = {} } = req.query as BookmarkGetAllPublicControllerQueryType;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;
    const checkedSize = Number(size) || undefined;
    const castedOffset = Number(offset) || undefined;

    const userBookmarkGetAllRequest: IUserBookmarkGetAllRequest = {
      userId,
      session,
      sort,
      size: checkedSize,
      offset: castedOffset,
    };

    const response = await this.useCase.execute(userBookmarkGetAllRequest);

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
