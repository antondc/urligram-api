import { Request, Response } from 'express';

import { IUserUpdatePasswordRequestDTO } from '@domain/user/dto/IUserUpdatePasswordRequestDTO';
import { IUserUpdatePasswordUseCase } from '@domain/user/useCases/UserUpdatePasswordUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserUpdatePasswordController extends BaseController {
  useCase: IUserUpdatePasswordUseCase;

  constructor(useCase: IUserUpdatePasswordUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { password, newPassword, newPasswordRepeated } = req.body;
    const { id } = req.params;

    const userUpdatePasswordRequestDTO: IUserUpdatePasswordRequestDTO = {
      id,
      password,
      newPassword,
      newPasswordRepeated,
    };

    const response = await this.useCase.execute(userUpdatePasswordRequestDTO);

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
