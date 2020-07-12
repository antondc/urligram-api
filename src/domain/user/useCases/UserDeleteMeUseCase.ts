import { IUserDeleteMeRequestDTO } from '@domain/user/dto/IUserDeleteMeRequestDTO';
import { IUserDeleteMeResponseDTO } from '@domain/user/dto/IUserDeleteMeResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IUserDeleteMeUseCase {
  execute: (userDeleteMeRequestDTO: IUserDeleteMeRequestDTO) => Promise<IUserDeleteMeResponseDTO>;
}

export class UserDeleteMeUseCase implements IUserDeleteMeUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userDeleteMeRequestDTO: IUserDeleteMeRequestDTO): Promise<IUserDeleteMeResponseDTO> {
    const { session } = userDeleteMeRequestDTO;

    const userExists = await this.userRepo.userGetOne({ id: session?.id });
    if (!userExists) throw new RequestError('User does not exist', 404);
    if (userExists.status === 'disabled') throw new RequestError('User was already removed', 409);

    const response = await this.userRepo.userDeleteMe({ id: session?.id });

    return response;
  }
}
