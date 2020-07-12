type byId = {
  id: number;
};

interface byUserNameAndType {
  userId: string;
  name: string;
}

export type IListGetOneRequestDTO = byId | byUserNameAndType;
