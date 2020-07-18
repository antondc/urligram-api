type byUserIdAndListName = {
  listName: string;
  userId: string;
};

type byListId = {
  listId: number;
};

export type IListUserAdminGetRequest = byListId | byUserIdAndListName;
