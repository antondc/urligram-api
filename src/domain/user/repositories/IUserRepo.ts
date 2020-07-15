import { IUserCreateOneRequest } from './interfaces/IUserCreateOneRequest';
import { IUserCreateOneResponse } from './interfaces/IUserCreateOneResponse';
import { IUserDeleteOneRequest } from './interfaces/IUserDeleteOneRequest';
import { IUserDeleteOneResponse } from './interfaces/IUserDeleteOneResponse';
import { IUserGetAllResponse } from './interfaces/IUserGetAllResponse';
import { IUserGetOneRequest } from './interfaces/IUserGetOneRequest';
import { IUserGetOneResponse } from './interfaces/IUserGetOneResponse';
import { IUserLoginRequest } from './interfaces/IUserLoginRequest';
import { IUserLoginResponse } from './interfaces/IUserLoginResponse';
import { IUserLogSessionRequest } from './interfaces/IUserLogSessionRequest';
import { IUserLogSessionResponse } from './interfaces/IUserLogSessionResponse';
import { IUserPasswordUpdateRequest } from './interfaces/IUserPasswordUpdateRequest';
import { IUserPasswordUpdateResponse } from './interfaces/IUserPasswordUpdateResponse';
import { IUserUpdateOneRequest } from './interfaces/IUserUpdateOneRequest';
import { IUserUpdateOneResponse } from './interfaces/IUserUpdateOneResponse';

export interface IUserRepo {
  userGetOne: (userGetOneRequest: IUserGetOneRequest) => Promise<IUserGetOneResponse>;
  userGetAll: () => Promise<IUserGetAllResponse>;
  userCreateOne: (userCreateOneRequest: IUserCreateOneRequest) => Promise<IUserCreateOneResponse>;
  userUpdateOne: (userUpdateOneRequest: IUserUpdateOneRequest) => Promise<IUserUpdateOneResponse>;
  userDeleteOne: (userDeleteOneRequest: IUserDeleteOneRequest) => Promise<IUserDeleteOneResponse>;
  userLogin: (userLoginRequest: IUserLoginRequest) => Promise<IUserLoginResponse>;
  userLogSession: (userLogSessionRequest: IUserLogSessionRequest) => Promise<IUserLogSessionResponse>;
  userPasswordUpdate: (userPasswordUpdateRequest: IUserPasswordUpdateRequest) => Promise<IUserPasswordUpdateResponse>;
}
