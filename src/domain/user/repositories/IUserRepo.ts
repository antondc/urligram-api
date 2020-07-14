import { IUserCreateOneRequest } from './interfaces/IUserCreateOneRequest';
import { IUserCreateOneResponse } from './interfaces/IUserCreateOneResponse';
import { IUserGetAllResponse } from './interfaces/IUserGetAllResponse';
import { IUserGetOneRequest } from './interfaces/IUserGetOneRequest';
import { IUserGetOneResponse } from './interfaces/IUserGetOneResponse';
import { IUserUpdateOneRequest } from './interfaces/IUserUpdateOneRequest';
import { IUserUpdateOneResponse } from './interfaces/IUserUpdateOneResponse';

export interface IUserRepo {
  userGetOne: (userGetOneRequest: IUserGetOneRequest) => Promise<IUserGetOneResponse>;
  userGetAll: () => Promise<IUserGetAllResponse>;
  userCreateOne: (userCreateOneRequest: IUserCreateOneRequest) => Promise<IUserCreateOneResponse>;
  userUpdateOne: (userUpdateOneRequest: IUserUpdateOneRequest) => Promise<IUserUpdateOneResponse>;
}
