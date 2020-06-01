import { User } from 'Domain/User';
import { ICreateUserRepo } from './ICreateUserRepo';
import { ICreateUserDTO } from './ICreateUserDTO';

export class CreateUserUseCase {
  private createUserRepo: ICreateUserRepo;

  constructor(createUserRepo: ICreateUserRepo) {
    this.createUserRepo = createUserRepo;
  }

  public execute(createUserDTO: ICreateUserDTO) {
    const user = new User(createUserDTO);
    this.createUserRepo.save(user);
  }
}
