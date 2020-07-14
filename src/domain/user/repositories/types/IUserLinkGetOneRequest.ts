interface byUserIdAndLinkId {
  userId: string;
  linkId: number;
}

interface byUserIdPathAndDomain {
  userId: string;
  path: string;
  domain: string;
}

export type IUserLinkGetOneRequest = byUserIdAndLinkId | byUserIdPathAndDomain;
