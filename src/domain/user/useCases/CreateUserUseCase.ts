import { ICreateUserRepo } from '@domain/user/repositories/ICreateUserRepo';
import { IFindUserRepo } from '@domain/user/repositories/IFindUserRepo';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';
import { User } from '../entities/User';
import { UserError } from '@shared/errors/UserError';

export interface ICreateUserUseCase {
  execute: (createUserDTO: ICreateUserRequestDTO) => Promise<ICreateUserResponseDTO>;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  private createUserRepo: ICreateUserRepo;
  private findUserRepo: IFindUserRepo;

  constructor(createUserRepo: ICreateUserRepo, findUserRepo: IFindUserRepo) {
    this.createUserRepo = createUserRepo;
    this.findUserRepo = findUserRepo;
  }

  public async execute(createUserDTO: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const user = await new User(undefined, undefined, undefined, undefined, this.findUserRepo);
    const foundUser = await user.find(createUserDTO);

    if (!!foundUser) throw new UserError('User already exist', 409);

    const response = await this.createUserRepo.create(createUserDTO);

    return response;
  }
}
