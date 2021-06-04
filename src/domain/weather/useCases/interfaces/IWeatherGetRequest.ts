import { User } from '@domain/user/entities/User';

export type IWeatherGetRequest = {
  remoteAddress: string;
  session: User;
};
