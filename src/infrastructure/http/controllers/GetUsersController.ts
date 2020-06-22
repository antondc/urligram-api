import { Request, Response } from 'express';

import { IGetUserUseCase } from '@domain/user/useCases/GetUsersUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class GetUsersController extends BaseController {
  useCase: IGetUserUseCase;

  constructor(useCase: IGetUserUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const response = await this.useCase.execute();

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users',
      },
      data: [
        {
          type: 'user',
          session: {
            self: URL_SERVER + '/users',
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
