import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserCreateOneRequest } from '@domain/user/useCases/interfaces/IUserCreateOneRequest';
import { IUserCreateOneResponse } from '@domain/user/useCases/interfaces/IUserCreateOneResponse';
import { UserError } from '@shared/errors/UserError';
import { StringValidator } from '@shared/services/StringValidator';

export interface IUserCreateOneUseCase {
  execute: (createUserDTO: IUserCreateOneRequest) => Promise<IUserCreateOneResponse>;
}

export class UserCreateOneUseCase implements IUserCreateOneUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(createUserDTO: IUserCreateOneRequest): Promise<IUserCreateOneResponse> {
    const { email, password, password_repeated } = createUserDTO;

    if (password !== password_repeated) throw new UserError('Passwords are not equal', 409);

    const isEmail = StringValidator.validateEmailAddress(email);
    if (!isEmail) throw new UserError('Email incorrect', 409);

    const userAlreadyExists = await this.userRepo.userGetOne(createUserDTO);
    if (!!userAlreadyExists) throw new UserError('User already exist', 409);

    const response = await this.userRepo.userCreateOne(createUserDTO);

    return response;
  }
}
