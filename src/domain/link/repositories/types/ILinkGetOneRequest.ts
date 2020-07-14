interface byId {
  id: number;
}

interface byUserPathAndDomain {
  path?: string;
  domain?: string;
}

export type ILinkGetOneRequest = byId | byUserPathAndDomain;
