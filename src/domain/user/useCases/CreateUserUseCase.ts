import { User } from '@domain/user/entities/User';
import { ICreateUserRepo } from '../repositories/ICreateUserRepo';
import { ICreateUserDTO } from '../dto/ICreateUserDTO';

export class CreateUserUseCase {
  private createUserRepo: ICreateUserRepo;

  constructor(createUserRepo: ICreateUserRepo) {
    this.createUserRepo = createUserRepo;
  }

  public async execute(createUserDTO: ICreateUserDTO) {
    const user = await new User(createUserDTO);

    const response = await this.createUserRepo.save(user);

    return response;
  }
}
