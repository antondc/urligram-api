import { Request, Response } from 'express';

import { IGetUserByIdUseCase } from '@domain/user/useCases/GetUserByIdUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class GetUserByIdController extends BaseController {
  useCase: IGetUserByIdUseCase;

  constructor(useCase: IGetUserByIdUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;

    const response = await this.useCase.execute({ id });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/' + id,
      },
      data: [
        {
          type: 'user',
          session: {
            self: URL_SERVER + '/users/' + id,
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
