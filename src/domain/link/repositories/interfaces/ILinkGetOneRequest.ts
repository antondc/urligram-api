export type byPathAndDomain = {
  sessionId: string;
  path: string;
  domain: string;
};

export type byLinkId = {
  sessionId: string;
  linkId: number;
};

export type ILinkGetOneRequest = byLinkId | byPathAndDomain;
