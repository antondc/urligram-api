interface byListId {
  userId: string;
  listId: number;
}

interface byUserIdAndListName {
  userId: string;
  listName: string;
}

export type IListGetOneByIdRequest = byListId | byUserIdAndListName;
