import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserTagsGetAllRequest } from '@domain/user/useCases/interfaces/IUserTagsGetAllRequest';
import { IUserTagsGetAllUseCase } from '@domain/user/useCases/UserTagsGetAllUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserTagsGetAllController extends BaseController {
  useCase: IUserTagsGetAllUseCase;

  constructor(useCase: IUserTagsGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { userId } = req.params;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const userUpdateRequest: IUserTagsGetAllRequest = {
      session,
      userId,
    };

    const response = await this.useCase.execute(userUpdateRequest);

    const formattedItems = response.map((item) => {
      return {
        type: 'tag',
        id: item.id,
        attributes: item,
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/' + userId + '/tags',
      },
      data: formattedItems,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
