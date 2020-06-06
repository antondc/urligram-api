import { ILoginUserRepo } from '@application/ILoginUserRepo';
import { ILoginUserDTO } from '@domain/ILoginUserDTO';

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
