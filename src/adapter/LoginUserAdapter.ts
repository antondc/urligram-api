import { ILoginUserUseCase } from '@domain/user/useCases/LoginUserUseCase';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILoginUserResponseDTO } from '@domain/user/dto/ILoginUserResponseDTO';

export class LoginUserAdapter {
  loginUserUseCase: ILoginUserUseCase;
  loginUserDTO: ILoginUserRequestDTO;

  constructor(loginUserUseCase: ILoginUserUseCase, loginUserDTO: ILoginUserRequestDTO) {
    this.loginUserDTO = loginUserDTO;
    this.loginUserUseCase = loginUserUseCase;
  }

  async authenticate(): Promise<ILoginUserResponseDTO> {
    const response = await this.loginUserUseCase.execute(this.loginUserDTO);

    return response;
  }
}
