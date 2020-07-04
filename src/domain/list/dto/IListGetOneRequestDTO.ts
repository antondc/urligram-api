type byId = {
  listId: number;
};

interface byUserNameAndType {
  userId: string;
  name: string;
  listType: 'private' | 'corporate';
}

export type IListGetOneRequestDTO = byId | byUserNameAndType;
