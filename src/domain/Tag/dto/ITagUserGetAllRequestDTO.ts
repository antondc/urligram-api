interface byId {
  tagId: number;
}

interface byName {
  name?: string;
}

export type ITagUserGetAllRequestDTO = byId | byName;
