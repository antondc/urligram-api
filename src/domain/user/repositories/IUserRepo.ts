import { IUserGetAllResponse } from './interfaces/IUserGetAllResponse';
import { IUserGetOneRequest } from './interfaces/IUserGetOneRequest';
import { IUserGetOneResponse } from './interfaces/IUserGetOneResponse';

export interface IUserRepo {
  userGetOne: (userGetOne: IUserGetOneRequest) => Promise<IUserGetOneResponse>;
  userGetAll: () => Promise<IUserGetAllResponse>;
}
