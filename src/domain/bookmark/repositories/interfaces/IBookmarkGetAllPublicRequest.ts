import { NumericLiteral } from 'typescript';

export type IBookmarkGetAllPublicRequest = {
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size: number;
  after: number;
};
