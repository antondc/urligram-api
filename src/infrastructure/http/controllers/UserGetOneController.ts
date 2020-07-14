import { Request, Response } from 'express';

import { IUserGetOneRequest } from '@domain/user/useCases/interfaces/IUserGetOneRequest';
import { IUserGetOneUseCase } from '@domain/user/useCases/UserGetOneUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserGetOneController extends BaseController {
  useCase: IUserGetOneUseCase;

  constructor(useCase: IUserGetOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { userId, name, email } = req.params;

    const userGetOneRequest: IUserGetOneRequest = {
      userId,
      name,
      email,
    };
    const response = await this.useCase.execute(userGetOneRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/' + userId,
      },
      data: [
        {
          type: 'user',
          session: {
            self: URL_SERVER + '/users/' + userId,
          },
          attributes: response,
          relationships: {},
        },
      ],
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
