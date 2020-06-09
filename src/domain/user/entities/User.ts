import { ILoginUserRepo } from '@domain/user/repositories/ILoginUserRepo';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILoginUserResponseDTO } from '@domain/user/dto/ILoginUserResponseDTO';

export class User {
  name: string;
  surname: string;
  loginUserRepo: ILoginUserRepo;

  constructor(userDTO?, loginUserRepo?: ILoginUserRepo) {
    this.name = userDTO?.name;
    this.surname = userDTO?.surname;
    this.loginUserRepo = loginUserRepo;
  }

  async authenticate(loginUserDTORequest: ILoginUserRequestDTO): Promise<ILoginUserResponseDTO> {
    const user = await this.loginUserRepo.authenticateUser(loginUserDTORequest);

    return user;
  }
}
