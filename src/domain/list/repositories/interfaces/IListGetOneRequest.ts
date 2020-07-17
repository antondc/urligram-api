type byId = {
  listId: number;
};

interface byUserNameAndType {
  userId: string;
  listName: string;
}

export type IListGetOneRequest = byId | byUserNameAndType;
