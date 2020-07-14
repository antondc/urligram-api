import { User } from '../entities/User';

interface byUserIdAndLinkId {
  session: User;
  linkId: number;
}

interface byUserIdPathAndDomain {
  session: User;
  path: string;
  domain: string;
}

export type IUserLinkGetOneRequestDTO = byUserIdAndLinkId | byUserIdPathAndDomain;
