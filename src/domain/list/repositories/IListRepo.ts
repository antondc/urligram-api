import { IListCreateRequestDTO } from '@domain/list/dto/IListCreateRequestDTO';
import { IListCreateResponseDTO } from '@domain/list/dto/IListCreateResponseDTO';

export interface IListRepo {
  listCreate: (listCreateRequestDTO: IListCreateRequestDTO) => Promise<IListCreateResponseDTO>;
}
