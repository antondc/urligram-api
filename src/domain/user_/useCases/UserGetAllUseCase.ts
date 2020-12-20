import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserGetAllResponse } from './interfaces/IUserGetAllResponse';

export interface IUserGetAllUseCase {
  execute: () => Promise<IUserGetAllResponse>;
}

export class UserGetAllUseCase implements IUserGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute() {
    const response = await this.userRepo.userGetAll();

    return response;
  }
}
