import { IListCreateRequestDTO } from '@domain/list/dto/IListCreateRequestDTO';
import { IListCreateResponseDTO } from '@domain/list/dto/IListCreateResponseDTO';
import { IListDeleteRequestDTO } from '@domain/list/dto/IListDeleteRequestDTO';
import { IListDeleteResponseDTO } from '@domain/list/dto/IListDeleteResponseDTO';
import { IListGetAllResponseDTO } from '@domain/list/dto/IListGetAllResponseDTO';
import { IListGetOneRequestDTO } from '@domain/list/dto/IListGetOneRequestDTO';
import { IListGetOneResponseDTO } from '@domain/list/dto/IListGetOneResponseDTO';
import { IListLinkCreateRequestDTO } from '@domain/list/dto/IListLinkCreateRequestDTO';
import { IListLinkCreateResponseDTO } from '@domain/list/dto/IListLinkCreateResponseDTO';
import { IListLinkDeleteRequestDTO } from '@domain/list/dto/IListLinkDeleteRequestDTO';
import { IListLinkDeleteResponseDTO } from '@domain/list/dto/IListLinkDeleteResponseDTO';
import { IListLinkGetOneRequestDTO } from '@domain/list/dto/IListLinkGetOneRequestDTO';
import { IListLinkGetOneResponseDTO } from '@domain/list/dto/IListLinkGetOneResponseDTO';
import { IListUpdateRequestDTO } from '@domain/list/dto/IListUpdateRequestDTO';
import { IListUpdateResponseDTO } from '@domain/list/dto/IListUpdateResponseDTO';

export interface IListRepo {
  listGetOne: (listGetOneRequestDTO: IListGetOneRequestDTO) => Promise<IListGetOneResponseDTO>;
  listGetAll: () => Promise<IListGetAllResponseDTO>;
  listCreate: (listCreateRequestDTO: IListCreateRequestDTO) => Promise<IListCreateResponseDTO>;
  listUpdate: (listUpdateRequestDTO: IListUpdateRequestDTO) => Promise<IListUpdateResponseDTO>;
  listDelete: (listDeleteRequestDTO: IListDeleteRequestDTO) => Promise<IListDeleteResponseDTO>;
  listLinkGetOne: (listLinkGetOneRequestDTO: IListLinkGetOneRequestDTO) => Promise<IListLinkGetOneResponseDTO>;
  listLinkCreate: (listLinkCreateRequestDTO: IListLinkCreateRequestDTO) => Promise<IListLinkCreateResponseDTO>;
  listLinkDelete: (listLinkDeleteRequestDTO: IListLinkDeleteRequestDTO) => Promise<IListLinkDeleteResponseDTO>;
}
