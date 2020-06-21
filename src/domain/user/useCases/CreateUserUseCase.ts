import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IFindUserRepo } from '@domain/user/repositories/IFindUserRepo';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';
import { User } from '../entities/User';
import { UserError } from '@shared/errors/UserError';
import { StringValidator } from '@shared/services/StringValidator';

export interface ICreateUserUseCase {
  execute: (createUserDTO: ICreateUserRequestDTO) => Promise<ICreateUserResponseDTO>;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  private userRepo: IUserRepo;
  private findUserRepo: IFindUserRepo;

  constructor(userRepo: IUserRepo, findUserRepo: IFindUserRepo) {
    this.userRepo = userRepo;
    this.findUserRepo = findUserRepo;
  }

  public async execute(createUserDTO: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const { email, password, password_repeated } = createUserDTO;

    if (password !== password_repeated) throw new UserError('Passwords are not equal', 409);

    const isEmail = StringValidator.validateEmailAddress(email);
    if (!isEmail) throw new UserError('Email incorrect', 409);

    const user = await new User(undefined, undefined, undefined, undefined, this.findUserRepo);
    const userAlreadyExists = await user.find(createUserDTO);
    if (!!userAlreadyExists) throw new UserError('User already exist', 409);

    const response = await this.userRepo.create(createUserDTO);

    return response;
  }
}
