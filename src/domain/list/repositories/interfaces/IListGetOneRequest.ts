interface byListId {
  listId: number;
}

interface byUserIdAndListName {
  userId: string;
  listName: string;
}

export type IListGetOneRequest = byListId | byUserIdAndListName;
