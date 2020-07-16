export type byUserIdPathAndDomain = {
  userId: string;
  path: string;
  domain: string;
};

export type byLinkId = {
  linkId: number;
};

export type ILinkGetOneRequest = byLinkId | byUserIdPathAndDomain;
