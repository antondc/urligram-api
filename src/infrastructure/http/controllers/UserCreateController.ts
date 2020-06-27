import { Request, Response } from 'express';

import { IUserCreateRequestDTO } from '@domain/user/dto/IUserCreateRequestDTO';
import { IUserCreateUseCase } from '@domain/user/useCases/UserCreateUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserCreateController extends BaseController {
  useCase: IUserCreateUseCase;

  constructor(useCase: IUserCreateUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const createUserDTO: IUserCreateRequestDTO = req.body;

    const response = await this.useCase.execute(createUserDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/me',
      },
      data: [
        {
          type: 'user',
          id: response.id,
          session: {
            self: URL_SERVER + '/users/me',
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
