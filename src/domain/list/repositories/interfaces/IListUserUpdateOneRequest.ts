export type IListUserUpdateOneRequest = {
  listId: number;
  userId: string;
  userRole: 'reader' | 'editor' | 'admin';
  userListStatus: 'pending' | 'active';
};
