import { ICreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { URL_SERVER } from '@shared/constants/env';

export class CreateUserController {
  createUserUseCase: ICreateUserUseCase;
  createUserDTO: ICreateUserRequestDTO;

  constructor(createUserUseCase: ICreateUserUseCase, createUserDTO: ICreateUserRequestDTO) {
    this.createUserDTO = createUserDTO;
    this.createUserUseCase = createUserUseCase;
  }

  async createUser() {
    const response = await this.createUserUseCase.execute(this.createUserDTO);

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

    return formattedResponse;
  }
}
