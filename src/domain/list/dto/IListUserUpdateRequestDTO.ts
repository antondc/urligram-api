export interface IListUserUpdateRequestDTO {
  listId: number;
  userId: string;
  currentUserId: string;
  newRole: 'admin' | 'user' | number;
}
