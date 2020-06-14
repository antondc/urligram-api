import { ILoginUserUseCase } from '@domain/user/useCases/LoginUserUseCase';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { URL_SERVER } from '@shared/constants/env';

export class LoginUserAdapter {
  loginUserUseCase: ILoginUserUseCase;
  loginUserDTO: ILoginUserRequestDTO;

  constructor(loginUserUseCase: ILoginUserUseCase, loginUserDTO: ILoginUserRequestDTO) {
    this.loginUserDTO = loginUserDTO;
    this.loginUserUseCase = loginUserUseCase;
  }

  async authenticate() {
    const response = await this.loginUserUseCase.execute(this.loginUserDTO);

    const formattedResponse = {
      session: {
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
