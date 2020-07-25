export type IListUserCreateOneRequest = {
  listId: number;
  userId: string;
  status: 'pending' | 'active';
};
