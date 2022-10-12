export type ILinkNotesGetAllPublicResponse = {
  meta: {
    totalItems: number;
    offset: number;
    size: number;
    sort: string;
  };
  notes: {
    notes: string;
    userId: number;
    userName: string;
    bookmarkId: number;
  }[];
};
