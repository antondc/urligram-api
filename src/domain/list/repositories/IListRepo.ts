import { IListCreateRequestDTO } from '@domain/list/dto/IListCreateRequestDTO';
import { IListCreateResponseDTO } from '@domain/list/dto/IListCreateResponseDTO';
import { IListDeleteRequestDTO } from '@domain/list/dto/IListDeleteRequestDTO';
import { IListDeleteResponseDTO } from '@domain/list/dto/IListDeleteResponseDTO';
import { IListGetOneRequestDTO } from '@domain/list/dto/IListGetOneRequestDTO';
import { IListGetOneResponseDTO } from '@domain/list/dto/IListGetOneResponseDTO';
import { IListUpdateRequestDTO } from '@domain/list/dto/IListUpdateRequestDTO';
import { IListUpdateResponseDTO } from '@domain/list/dto/IListUpdateResponseDTO';

export interface IListRepo {
  listGetOne: (listGetOneRequestDTO: IListGetOneRequestDTO) => Promise<IListGetOneResponseDTO>;
  listCreate: (listCreateRequestDTO: IListCreateRequestDTO) => Promise<IListCreateResponseDTO>;
  listUpdate: (listUpdateRequestDTO: IListUpdateRequestDTO) => Promise<IListUpdateResponseDTO>;
  listDelete: (listDeleteRequestDTO: IListDeleteRequestDTO) => Promise<IListDeleteResponseDTO>;
}
