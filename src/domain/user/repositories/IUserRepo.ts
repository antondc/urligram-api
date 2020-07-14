import { IUserGetAllResponse } from './interfaces/IUserGetAllResponse';

export interface IUserRepo {
  userGetAll: () => Promise<IUserGetAllResponse>;
}
