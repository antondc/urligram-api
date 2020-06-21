import { ILoginUserUseCase } from '@domain/user/useCases/LoginUserUseCase';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { URL_SERVER } from '@shared/constants/env';

export class LoginUserController {
  loginUserUseCase: ILoginUserUseCase;

  constructor(loginUserUseCase: ILoginUserUseCase) {
    this.loginUserUseCase = loginUserUseCase;
  }

  async execute(loginUserDTO: ILoginUserRequestDTO) {
    const response = await this.loginUserUseCase.execute(loginUserDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/me',
      },
      data: [
        {
          type: 'session',
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

    return formattedResponse;
  }
}
