import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserFollowerGetAllUseCase } from '@domain/user/useCases/UserFollowerGetAllUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

type UserFollowerGetAllControllerQueryType = {
  sort?: 'order' | '-order' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  page: {
    size: string;
    offset: string;
  };
};

export class UserFollowerGetAllController extends BaseController {
  useCase: IUserFollowerGetAllUseCase;

  constructor(useCase: IUserFollowerGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort, page: { size, offset } = {} } = req.query as UserFollowerGetAllControllerQueryType;
    const { userId } = req.params;
    const castedSize = Number(size) || DEFAULT_PAGE_SIZE;
    const castedOffset = Number(offset) || undefined;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const { users, meta } = await this.useCase.execute({ session, userId, sort, size: castedSize, offset: castedOffset });

    const formattedItems = users.map((item) => {
      return {
        type: 'user',
        id: item.id,
        session: {
          self: URL_SERVER + '/users/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/followers' + userId,
      },
      meta,
      data: formattedItems,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
