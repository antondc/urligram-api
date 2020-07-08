import { Request, Response } from 'express';

import { IUserUpdateRequestDTO } from '@domain/user/dto/IUserUpdateRequestDTO';
import { IUserUpdateUseCase } from '@domain/user/useCases/UserUpdateUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserUpdateController extends BaseController {
  useCase: IUserUpdateUseCase;

  constructor(useCase: IUserUpdateUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { name, email, statement, location } = req.body;
    const { id } = req.params;

    const userUpdateRequestDTO: IUserUpdateRequestDTO = {
      id,
      name,
      email,
      statement,
      location,
    };

    const response = await this.useCase.execute(userUpdateRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users',
      },
      data: [
        {
          type: 'link',
          id: response?.id,
          session: {
            self: URL_SERVER + '/users' + response.id,
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
