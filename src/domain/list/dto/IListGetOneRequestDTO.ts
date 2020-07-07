type byId = {
  id: number;
};

interface byUserNameAndType {
  userId: string;
  name: string;
  listType: string;
}

export type IListGetOneRequestDTO = byId | byUserNameAndType;
