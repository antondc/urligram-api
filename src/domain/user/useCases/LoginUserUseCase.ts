import { User } from '@domain/user/entities/User';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILoginUserResponseDTO } from '@domain/user/dto/ILoginUserResponseDTO';
import { ILoginUserRepo } from '../repositories/ILoginUserRepo';

export interface ILoginUserUseCase {
  execute: (loginUserDTO: ILoginUserRequestDTO) => Promise<ILoginUserResponseDTO>;
}

export class LoginUserUseCase implements ILoginUserUseCase {
  private loginUserRepo: ILoginUserRepo;

  constructor(loginUserRepo: ILoginUserRepo) {
    this.loginUserRepo = loginUserRepo;
  }

  public async execute(loginUserDTO: ILoginUserRequestDTO): Promise<ILoginUserResponseDTO> {
    const user = await new User(undefined, this.loginUserRepo);

    const response = await user.authenticate(loginUserDTO);

    return response;
  }
}
