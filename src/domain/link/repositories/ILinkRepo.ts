import { ILinkGetOneRequest } from './interfaces/ILinkGetOneRequest';
import { ILinkGetOneResponse } from './interfaces/ILinkGetOneResponse';

export interface ILinkRepo {
  linkGetOne: (linkGetOneRequest: ILinkGetOneRequest) => Promise<ILinkGetOneResponse>;
}
