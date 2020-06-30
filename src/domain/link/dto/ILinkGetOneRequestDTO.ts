interface byId {
  id: number;
}

interface byUserPathAndDomain {
  userId?: string;
  path?: string;
  domain?: string;
}

export type ILinkGetOneRequestDTO = byId | byUserPathAndDomain;
