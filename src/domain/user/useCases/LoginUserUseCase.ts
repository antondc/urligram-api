import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILoginUserResponseDTO } from '@domain/user/dto/ILoginUserResponseDTO';
import { IUserRepo } from '../repositories/IUserRepo';

export interface ILoginUserUseCase {
  execute: (loginUserDTO: ILoginUserRequestDTO) => Promise<ILoginUserResponseDTO>;
}

export class LoginUserUseCase implements ILoginUserUseCase {
  userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(loginUserDTO: ILoginUserRequestDTO): Promise<ILoginUserResponseDTO> {
    const response = await this.userRepo.authenticate(loginUserDTO);

    return response;
  }
}
