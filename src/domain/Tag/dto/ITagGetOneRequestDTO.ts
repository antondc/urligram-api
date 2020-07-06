interface byId {
  id: number;
}

interface byName {
  name?: string;
}

export type ITagGetOneRequestDTO = byId | byName;
