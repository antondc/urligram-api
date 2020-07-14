import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { UserError } from '@shared/errors/UserError';
import { StringValidator } from '@shared/services/StringValidator';
import { IUserUpdateOneRequest } from './interfaces/IUserUpdateOneRequest';
import { IUserUpdateOneResponse } from './interfaces/IUserUpdateOneResponse';

export interface IUserUpdateOneUseCase {
  execute: (userUpdateRequestDTO: IUserUpdateOneRequest) => Promise<IUserUpdateOneResponse>;
}

export class UserUpdateOneUseCase implements IUserUpdateOneUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userUpdateRequestDTO: IUserUpdateOneRequest): Promise<IUserUpdateOneResponse> {
    const { email, session } = userUpdateRequestDTO;

    const isEmail = StringValidator.validateEmailAddress(email);
    if (!isEmail) throw new UserError('Email incorrect', 409);

    const userExists = await this.userRepo.userGetOne(userUpdateRequestDTO);
    if (!userExists) throw new RequestError('User does not exist', 404);

    await this.userRepo.userUpdateOne({ ...userUpdateRequestDTO, userId: session?.id });

    const response = await this.userRepo.userGetOne({ userId: session?.id });

    return response;
  }
}
