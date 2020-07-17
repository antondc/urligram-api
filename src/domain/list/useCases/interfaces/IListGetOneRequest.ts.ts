import { User } from '@domain/user/entities/User';

type byId = {
  listId: number;
  session: User;
};

interface byUserNameAndType {
  listName: string;
  session: User;
}

export type IListGetOneRequest = byId | byUserNameAndType;
