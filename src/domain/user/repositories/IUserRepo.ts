import { IUserCreateOneRequest } from './interfaces/IUserCreateOneRequest';
import { IUserCreateOneResponse } from './interfaces/IUserCreateOneResponse';
import { IUserGetAllResponse } from './interfaces/IUserGetAllResponse';
import { IUserGetOneRequest } from './interfaces/IUserGetOneRequest';
import { IUserGetOneResponse } from './interfaces/IUserGetOneResponse';

export interface IUserRepo {
  userGetOne: (userGetOneRequest: IUserGetOneRequest) => Promise<IUserGetOneResponse>;
  userGetAll: () => Promise<IUserGetAllResponse>;
  userCreateOne: (userCreateOneRequest: IUserCreateOneRequest) => Promise<IUserCreateOneResponse>;
}
