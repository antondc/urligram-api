import { IUserDeleteRequestDTO } from '@domain/user/dto/IUserDeleteRequestDTO';
import { IUserDeleteResponseDTO } from '@domain/user/dto/IUserDeleteResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IUserDeleteUseCase {
  execute: (userDeleteRequestDTO: IUserDeleteRequestDTO) => Promise<IUserDeleteResponseDTO>;
}

export class UserDeleteUseCase implements IUserDeleteUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userDeleteRequestDTO: IUserDeleteRequestDTO): Promise<IUserDeleteResponseDTO> {
    const userExists = await this.userRepo.userGetOne(userDeleteRequestDTO);
    if (!userExists) throw new RequestError('User does not exist', 404);
    if (userExists.status === 'disabled') throw new RequestError('User was already removed', 409);

    const response = await this.userRepo.userDelete(userDeleteRequestDTO);

    return response;
  }
}
