import { ILoginUserUseCase } from '@domain/user/useCases/LoginUserUseCase';
import { ILoginUserDTO } from '@domain/user/dto/ILoginUserDTO';

export class LoginUserAdapter {
  loginUserUseCase: ILoginUserUseCase;
  loginUserDTO: ILoginUserDTO;

  constructor(loginUserUseCase: ILoginUserUseCase, loginUserDTO: ILoginUserDTO) {
    this.loginUserDTO = loginUserDTO;
    this.loginUserUseCase = loginUserUseCase;
  }

  async authenticate(): Promise<ILoginUserDTO> {
    const response = await this.loginUserUseCase.execute(this.loginUserDTO);

    return response;
  }
}
