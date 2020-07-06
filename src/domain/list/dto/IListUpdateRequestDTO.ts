export interface IListUpdateRequestDTO {
  id: number;
  userId: string;
  name: string;
  description: string;
  isPublic: boolean;
  listType: 'private' | 'corporate';
}
