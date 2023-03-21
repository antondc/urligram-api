export type ILinkNotesGetAllPublicRequest = {
  sessionId: string;
  linkId: number;
  sort?: 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size?: number;
  offset?: number;
};
