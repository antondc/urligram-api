import { User } from '@domain/user/entities/User';

export type ILinkUpsertOneRequest = {
  session: User;
  url: string;
  alternativeTitle?: string;
};
