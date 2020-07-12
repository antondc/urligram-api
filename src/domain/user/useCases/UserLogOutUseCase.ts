import { IUserLogoutRequestDTO } from '@domain/user/dto/IUserLogoutRequestDTO';
import { IUserLogoutResponseDTO } from '@domain/user/dto/IUserLogoutResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { AuthenticationError } from '@shared/errors/AuthenticationError';

export interface IUserLogOutUseCase {
  execute: (userLogoutDTO: IUserLogoutRequestDTO) => Promise<IUserLogoutResponseDTO>;
}

export class UserLogOutUseCase implements IUserLogOutUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userLogoutDTO: IUserLogoutRequestDTO): Promise<IUserLogoutResponseDTO> {
    const { session } = userLogoutDTO;

    if (!session?.id) throw new AuthenticationError('User is not logged in', 500);

    const sessionLogData = {
      result: 'success',
      type: 'logout',
      id: session?.id,
    };

    await this.userRepo.logSession(sessionLogData);

    const result = {
      session,
    };

    return result;
  }
}
