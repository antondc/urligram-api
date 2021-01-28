import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserListGetAllPublicRequest } from '@domain/user/useCases/interfaces/IUserListGetAllPublicRequest';
import { IUserListGetAllPublicUseCase } from '@domain/user/useCases/UserListGetAllPublicUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

type UserListGetAllPublicControllerQueryType = {
  sort: 'id' | '-id' | 'order' | '-order' | 'bookmarks' | '-bookmarks' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  page: {
    size: string;
    offset: string;
  };
};

export class UserListGetAllPublicController extends BaseController {
  useCase: IUserListGetAllPublicUseCase;

  constructor(useCase: IUserListGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort, page: { size, offset } = {} } = req.query as UserListGetAllPublicControllerQueryType;
    const checkedSize = Number(size) || undefined;
    const checkedOffset = Number(offset) || undefined;

    const { userId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const userListGetAllPublicRequest: IUserListGetAllPublicRequest = {
      userId,
      session,
      sort,
      size: checkedSize,
      offset: checkedOffset,
    };

    const response = await this.useCase.execute(userListGetAllPublicRequest);

    const formattedLinks = response.map((item) => {
      return {
        type: 'list',
        id: item.id,
        session: {
          self: URL_SERVER + '/lists/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/' + userId + '/lists',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
