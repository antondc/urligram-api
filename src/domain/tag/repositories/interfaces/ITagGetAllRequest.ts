export type ITagGetAllRequest = {
  sessionId: string;
  sort: 'id' | '-id' | 'name' | '-name' | 'count' | '-count';
  size: number;
  offset: number;
  filter?: {
    name?: string;
  };
};
