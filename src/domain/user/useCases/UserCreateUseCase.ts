import { IUserCreateRequestDTO } from '@domain/user/dto/IUserCreateRequestDTO';
import { IUserCreateResponseDTO } from '@domain/user/dto/IUserCreateResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { UserError } from '@shared/errors/UserError';
import { StringValidator } from '@shared/services/StringValidator';

export interface IUserCreateUseCase {
  execute: (createUserDTO: IUserCreateRequestDTO) => Promise<IUserCreateResponseDTO>;
}

export class UserCreateUseCase implements IUserCreateUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(createUserDTO: IUserCreateRequestDTO): Promise<IUserCreateResponseDTO> {
    const { email, password, password_repeated } = createUserDTO;

    if (password !== password_repeated) throw new UserError('Passwords are not equal', 409);

    const isEmail = StringValidator.validateEmailAddress(email);
    if (!isEmail) throw new UserError('Email incorrect', 409);

    const userAlreadyExists = await this.userRepo.userGetOne(createUserDTO);
    if (!!userAlreadyExists) throw new UserError('User already exist', 409);

    const response = await this.userRepo.userCreate(createUserDTO);

    return response;
  }
}
