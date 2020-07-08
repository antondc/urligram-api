import { IUserUpdateRequestDTO } from '@domain/user/dto/IUserUpdateRequestDTO';
import { IUserUpdateResponseDTO } from '@domain/user/dto/IUserUpdateResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { UserError } from '@shared/errors/UserError';
import { StringValidator } from '@shared/services/StringValidator';

export interface IUserUpdateUseCase {
  execute: (userUpdateRequestDTO: IUserUpdateRequestDTO) => Promise<IUserUpdateResponseDTO>;
}

export class UserUpdateUseCase implements IUserUpdateUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userUpdateRequestDTO: IUserUpdateRequestDTO): Promise<IUserUpdateResponseDTO> {
    const { email } = userUpdateRequestDTO;

    const isEmail = StringValidator.validateEmailAddress(email);
    if (!isEmail) throw new UserError('Email incorrect', 409);

    const userExists = await this.userRepo.userGetOne(userUpdateRequestDTO);
    if (!userExists) throw new RequestError('User does not exist', 404);

    await this.userRepo.userUpdate(userUpdateRequestDTO);

    const response = await this.userRepo.userGetOne(userUpdateRequestDTO);

    return response;
  }
}
