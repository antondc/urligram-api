import { IUser } from 'Domain/IUser';
import { ICreateUserRepo } from './ICreateUserRepo';

export class CreateUserUseCase {
  private user: IUser;
  private createUserRepo: ICreateUserRepo;

  constructor(user: IUser, createUserRepo: ICreateUserRepo) {
    this.user = user;
    this.createUserRepo = createUserRepo;
  }

  public execute() {
    this.createUserRepo.save(this.user);
  }
}
