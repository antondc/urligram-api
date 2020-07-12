import { IUserUpdatePasswordRequestDTO } from '@domain/user/dto/IUserUpdatePasswordRequestDTO';
import { IUserUpdatePasswordResponseDTO } from '@domain/user/dto/IUserUpdatePasswordResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { AuthenticationError } from '@shared/errors/AuthenticationError';
import { UserError } from '@shared/errors/UserError';

export interface IUserUpdatePasswordUseCase {
  execute: (userUpdatePasswordRequestDTO: IUserUpdatePasswordRequestDTO) => Promise<IUserUpdatePasswordResponseDTO>;
}

export class UserUpdatePasswordUseCase implements IUserUpdatePasswordUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userUpdatePasswordRequestDTO: IUserUpdatePasswordRequestDTO): Promise<IUserUpdatePasswordResponseDTO> {
    const { newPassword, newPasswordRepeated, session } = userUpdatePasswordRequestDTO;

    const userAuthenticated = await this.userRepo.authenticate({ ...userUpdatePasswordRequestDTO, id: session?.id });
    if (!userAuthenticated) throw new AuthenticationError('Username or password not correct', 403);

    const userFound = await this.userRepo.userGetOne(userAuthenticated);
    if (!userFound) throw new AuthenticationError('User not found', 404);

    if (newPassword !== newPasswordRepeated) throw new UserError('Passwords are not equal', 409);

    await this.userRepo.userUpdatePassword({ ...userUpdatePasswordRequestDTO, id: session?.id });

    return userFound;
  }
}
