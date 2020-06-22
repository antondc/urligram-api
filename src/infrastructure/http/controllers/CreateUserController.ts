import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { URL_SERVER } from '@shared/constants/env';

export class CreateUserController {
  createUserUseCase: ICreateUserUseCase;

  constructor(createUserUseCase: ICreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(createUserDTO: ICreateUserRequestDTO) {
    const response = await this.createUserUseCase.execute(createUserDTO);

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
