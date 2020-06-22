import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IGetUserByIdRequestDTO } from '../dto/IGetUserByIdRequestDTO';

export interface IGetUserByIdUseCase {
  execute: (getUserByIdDTO: IGetUserByIdRequestDTO) => Promise<ICreateUserResponseDTO>;
}

export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(getUserByIdDTO: IGetUserByIdRequestDTO): Promise<ICreateUserResponseDTO> {
    const response = await this.userRepo.getOne(getUserByIdDTO);

    return response;
  }
}
