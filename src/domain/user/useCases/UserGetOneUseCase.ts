import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserGetOneRequest } from './interfaces/IUserGetOneRequest';
import { IUserGetOneResponse } from './interfaces/IUserGetOneResponse';

export interface IUserGetOneUseCase {
  execute: (userGetOneDTO: IUserGetOneRequest) => Promise<IUserGetOneResponse>;
}

export class UserGetOneUseCase implements IUserGetOneUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userGetOneDTO) {
    const response = await this.userRepo.userGetOne(userGetOneDTO);

    return response;
  }
}
