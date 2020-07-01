type Tag = {
  tag: string;
};

type List = {
  id: number;
};

export interface ILinkUpdateRequestDTO {
  id?: string;
  userId: string;
  order: number;
  saved: boolean;
  vote: boolean;
  isPublic: boolean;
  url: string;
  tags: Tag[];
  lists?: List[];
}
