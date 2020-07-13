import { User } from '@domain/user/entities/User';

interface byId {
  session: User;
  id: number;
}

interface byUserPathAndDomain {
  session: User;
  userId?: string;
  path?: string;
  domain?: string;
}

export type ILinkGetOneRequestDTO = byId | byUserPathAndDomain;
