interface byUserIdAndBookmarkId {
  bookmarkId: number;
  userId: string;
}

interface byUserIdAndLinkId {
  userId: string;
  linkId: number;
}

interface byUserIdAndPathAndDomain {
  userId: string;
  path: string;
  domain: string;
}

export type IUserBookmarkGetOneRequest = byUserIdAndPathAndDomain | byUserIdAndLinkId | byUserIdAndBookmarkId;
