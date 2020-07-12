export interface IListUpdateRequestDTO {
  id: number;
  userId: string;
  name: string;
  description: string;
  isPrivate: boolean;
  listType: string;
}
