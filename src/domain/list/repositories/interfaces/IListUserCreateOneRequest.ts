export type IListUserCreateOneRequest = {
  listId: number;
  userId: string;
  userListStatus: 'pending' | 'active';
};
