export type ILinkGetAllRequest = {
  sessionId: string;
  sort: 'order' | '-order' | 'most-bookmarked' | '-most-bookmarked' | 'created' | '-created' | 'vote' | '-vote' | 'last-bookmarked' | '-last-bookmarked';
  size: number;
  offset: number;
  filter?: {
    tags?: string[];
  };
};
