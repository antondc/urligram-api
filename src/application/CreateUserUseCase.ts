import { User } from 'Domain/User';
import { ICreateUserRepo } from './ICreateUserRepo';

export class CreateUserUseCase {
  private user: User;
  private createUserRepo: ICreateUserRepo;

  constructor(user: User, createUserRepo: ICreateUserRepo) {
    this.user = user;
    this.createUserRepo = createUserRepo;
  }

  public execute() {
    this.createUserRepo.save(this.user);
  }
}
