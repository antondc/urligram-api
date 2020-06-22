import { Request, Response } from 'express';

import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class CreateUserController extends BaseController {
  useCase: ICreateUserUseCase;

  constructor(useCase: ICreateUserUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const createUserDTO: ICreateUserRequestDTO = req.body;

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
