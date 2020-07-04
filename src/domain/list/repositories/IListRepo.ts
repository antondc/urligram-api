import { IListCreateRequestDTO } from '@domain/list/dto/IListCreateRequestDTO';
import { IListCreateResponseDTO } from '@domain/list/dto/IListCreateResponseDTO';
import { IListGetOneRequestDTO } from '@domain/list/dto/IListGetOneRequestDTO';
import { IListGetOneResponseDTO } from '@domain/list/dto/IListGetOneResponseDTO';

export interface IListRepo {
  listCreate: (listCreateRequestDTO: IListCreateRequestDTO) => Promise<IListCreateResponseDTO>;
  listGetOne: (listGetOneRequestDTO: IListGetOneRequestDTO) => Promise<IListGetOneResponseDTO>;
}
