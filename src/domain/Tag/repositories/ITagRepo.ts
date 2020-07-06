import { ITagGetAllResponseDTO } from '@domain/tag/dto/ITagGetAllResponseDTO';

export interface ITagRepo {
  tagGetAll: () => Promise<ITagGetAllResponseDTO>;
}
