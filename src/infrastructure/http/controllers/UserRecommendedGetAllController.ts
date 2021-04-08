import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserRecommendedGetAllUseCase } from '@domain/user/useCases/UserRecommendedGetAllUseCase';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

const DEFAULT_SORT = 'updatedAt';

type UserRecommendedGetAllControllerQueryType = {
  sort?: 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  page: {
    size: string;
    offset: string;
  };
};

export class UserRecommendedGetAllController extends BaseController {
  useCase: IUserRecommendedGetAllUseCase;

  constructor(useCase: IUserRecommendedGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort = DEFAULT_SORT, page: { size, offset } = {} } = req.query as UserRecommendedGetAllControllerQueryType;
    const {} = req.params;
    const castedSize = Number(size) || DEFAULT_PAGE_SIZE;
    const castedOffset = Number(offset) || undefined;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const { links, meta } = await this.useCase.execute({ session, sort, size: castedSize, offset: castedOffset });

    const formattedItems = links.map((item) => {
      return {
        type: 'user',
        id: item.id,
        session: {
          // self: URL_SERVER + '/users/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/me/following',
      },
      meta,
      data: formattedItems,
    };

    return res.status(200).send(formattedResponse);
  }
}
