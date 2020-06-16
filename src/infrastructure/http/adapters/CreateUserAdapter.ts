import { ICreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';
import { URL_SERVER } from '@shared/constants/env';

export class CreateUserAdapter {
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
