export interface IListCreateRequestDTO {
  userId: string;
  name: string;
  description: string;
  isPublic: boolean;
  listType: 'private' | 'corporate';
}
