import { User } from '@domain/User';
import { ILoginUserDTO } from '@domain/ILoginUserDTO';
import { ILoginUserRepo } from './ILoginUserRepo';

export class LoginUserUseCase {
  loginUserRepo: ILoginUserRepo;

  constructor(loginUserRepo: ILoginUserRepo) {
    this.loginUserRepo = loginUserRepo;
  }

  public async execute(loginUserDTO: ILoginUserDTO) {
    const user = await new User(undefined, this.loginUserRepo);

    const response = await user.authenticate(loginUserDTO);

    return response;
  }
}
