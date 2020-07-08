import { Request, Response } from 'express';

import { IUserDeleteRequestDTO } from '@domain/user/dto/IUserDeleteRequestDTO';
import { IUserDeleteUseCase } from '@domain/user/useCases/UserDeleteUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserDeleteController extends BaseController {
  useCase: IUserDeleteUseCase;

  constructor(useCase: IUserDeleteUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;

    const userDeleteRequestDTO: IUserDeleteRequestDTO = {
      id,
    };

    const response = await this.useCase.execute(userDeleteRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users',
      },
      data: [
        {
          type: 'user',
          id: response?.id,
          session: {
            self: URL_SERVER + '/users' + id,
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
