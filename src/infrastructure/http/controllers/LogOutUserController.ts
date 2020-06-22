import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { ILogOutUserUseCase } from '@domain/user/useCases/LogOutUserUseCase';
import { URL_SERVER } from '@shared/constants/env';

export class LogOutUserController {
  logOutUserUseCase: ILogOutUserUseCase;

  constructor(logOutUserUseCase: ILogOutUserUseCase) {
    this.logOutUserUseCase = logOutUserUseCase;
  }

  async execute(logOutUserRequestDTO: ILogOutUserRequestDTO) {
    const response = await this.logOutUserUseCase.execute(logOutUserRequestDTO);

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
