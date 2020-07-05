type User = {
  id: number;
};

type Link = {
  id: number;
};

export interface IListUpdateRequestDTO {
  id: number;
  userId: string;
  name: string;
  description: string;
  isPublic: boolean;
  listType: 'private' | 'corporate';
  links?: Link[];
  users?: User[];
}
