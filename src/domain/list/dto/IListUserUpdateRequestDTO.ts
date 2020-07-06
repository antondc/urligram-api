export interface IListUserUpdateRequestDTO {
  listId: number;
  userId: string;
  newRole: 'admin' | 'user';
}
