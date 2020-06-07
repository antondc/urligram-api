import { ILoginUserRepo } from '@domain/user/repositories/ILoginUserRepo';
import { ILoginUserDTO } from '@domain/user/dto/ILoginUserDTO';

export class User {
  name: string;
  surname: string;
  loginUserRepo: ILoginUserRepo;

  constructor(userDTO?, loginUserRepo?: ILoginUserRepo) {
    this.name = userDTO?.name;
    this.surname = userDTO?.surname;
    this.loginUserRepo = loginUserRepo;
  }

  async authenticate(loginUserDTORequest: ILoginUserDTO) {
    const user = await this.loginUserRepo.authenticateUser(loginUserDTORequest);

    return user;
  }
}
