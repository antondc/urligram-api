export type ILinkNotesGetAllPublicRequest = {
  linkId: number;
  sort?: 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size?: number;
  offset?: number;
};
