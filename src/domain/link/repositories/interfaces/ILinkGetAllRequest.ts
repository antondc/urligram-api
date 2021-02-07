export type ILinkGetAllRequest = {
  sessionId: string;
  sort: 'id' | '-id' | 'order' | '-order' | 'count' | '-count';
  size: number;
  offset: number;
};
