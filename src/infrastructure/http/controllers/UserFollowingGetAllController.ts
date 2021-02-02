import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserFollowingGetAllUseCase } from '@domain/user/useCases/UserFollowingGetAllUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

type UserFollowingGetAllControllerQueryType = {
  sort?: 'order' | '-order' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  page: {
    size: string;
    offset: string;
  };
};

export class UserFollowingGetAllController extends BaseController {
  useCase: IUserFollowingGetAllUseCase;

  constructor(useCase: IUserFollowingGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort, page: { size, offset } = {} } = req.query as UserFollowingGetAllControllerQueryType;
    const { userId } = req.params;
    const castedSize = Number(size) || undefined;
    const castedOffset = Number(offset) || undefined;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const response = await this.useCase.execute({ session, userId, sort, size: castedSize, offset: castedOffset });

    const formattedItems = response.map((item) => {
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
        self: URL_SERVER + '/users/' + userId + '/following',
      },
      data: formattedItems,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
