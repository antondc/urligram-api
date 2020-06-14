import { ILogOutUserUseCase } from '@domain/user/useCases/LogOutUserUseCase';
import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { URL_SERVER } from '@shared/constants/env';
import { ILogOutUserResponseDTO } from '@domain/user/dto/ILogOutUserResponseDTO';

export class LogOutUserAdapter {
  logOutUserUseCase: ILogOutUserUseCase;
  logOutUserRequestDTO: ILogOutUserRequestDTO;

  constructor(logOutUserUseCase: ILogOutUserUseCase, logOutUserRequestDTO: ILogOutUserRequestDTO) {
    this.logOutUserRequestDTO = logOutUserRequestDTO;
    this.logOutUserUseCase = logOutUserUseCase;
  }

  async deauthenticate() {
    const response = await this.logOutUserUseCase.execute(this.logOutUserRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/login',
      },
      data: [
        {
          type: 'session',
          id: response.id,
          login: {
            self: URL_SERVER + '/login',
          },
          attributes: {
            id: response.id,
          },
          relationships: {},
        },
      ],
      included: [],
    };

    return formattedResponse;
  }
}
