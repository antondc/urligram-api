import { User } from '@domain/user/entities/User';
import { ILoginUserDTO } from '@domain/user/dto/ILoginUserDTO';
import { ILoginUserRepo } from '../repositories/ILoginUserRepo';

export interface ILoginUserUseCase {
  execute: (loginUserDTO: ILoginUserDTO) => Promise<ILoginUserDTO>;
}

export class LoginUserUseCase {
  loginUserRepo: ILoginUserRepo;

  constructor(loginUserRepo: ILoginUserRepo) {
    this.loginUserRepo = loginUserRepo;
  }

  public async execute(loginUserDTO: ILoginUserDTO): Promise<ILoginUserDTO> {
    const user = await new User(undefined, this.loginUserRepo);

    const response = await user.authenticate(loginUserDTO);

    return response;
  }
}
