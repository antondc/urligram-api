import { IUserLinkGetOneRequestDTO } from '@domain/user/dto/IUserLinkGetOneRequestDTO';
import { IUserLinkGetOneResponseDTO } from '@domain/user/dto/IUserLinkGetOneResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IUserLinkGetOneUseCase {
  execute: (userLinkGetOneDTO: IUserLinkGetOneRequestDTO) => Promise<IUserLinkGetOneResponseDTO>;
}

export class UserLinkGetOneUseCase implements IUserLinkGetOneUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userLinkGetOneRequest: IUserLinkGetOneRequestDTO): Promise<IUserLinkGetOneResponseDTO> {
    // Returns relation of user <=> link
    const { session } = userLinkGetOneRequest;

    const response = await this.userRepo.userLinkGetOne({ ...userLinkGetOneRequest, userId: session.id });

    if (!response) throw new RequestError('User link not found', 404, { message: '404 Not Found' });

    return response;
  }
}
