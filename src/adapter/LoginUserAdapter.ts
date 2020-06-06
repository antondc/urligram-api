import { ILoginUserUseCase } from '@application/ILoginUserUseCase';
import { ILoginUserDTO } from '@domain/ILoginUserDTO';

export class LoginUserAdapter {
  loginUserUseCase: ILoginUserUseCase;
  loginUserDTO: ILoginUserDTO;

  constructor(loginUserUseCase: ILoginUserUseCase, loginUserDTO: ILoginUserDTO) {
    this.loginUserDTO = loginUserDTO;
    this.loginUserUseCase = loginUserUseCase;
  }

  async authenticate() {
    const response = await this.loginUserUseCase.execute(this.loginUserDTO);

    return response;
  }
}
