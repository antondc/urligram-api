import { ILinkDeleteRequestDTO } from '@domain/link/dto/ILinkDeleteRequestDTO';
import { ILinkDeleteResponseDTO } from '@domain/link/dto/ILinkDeleteResponseDTO';
import { ILinkListGetAllRequestDTO } from '@domain/link/dto/ILinkListGetAllRequestDTO';
import { ILinkListGetAllResponseDTO } from '@domain/link/dto/ILinkListGetAllResponseDTO';
import { ILinkTagGetAllRequestDTO } from '@domain/link/dto/ILinkTagGetAllRequestDTO';
import { ILinkTagGetAllResponseDTO } from '@domain/link/dto/ILinkTagGetAllResponseDTO';
import { ILinkUpdateRequestDTO } from '@domain/link/dto/ILinkUpdateRequestDTO';
import { ILinkUpdateResponseDTO } from '@domain/link/dto/ILinkUpdateResponseDTO';
import { ILinkGetAllResponse } from '@domain/link/repositories/types/ILinkGetAllResponse';
import { ILinkGetOneRequest } from '@domain/link/repositories/types/ILinkGetOneRequest';
import { ILinkGetOneResponse } from '@domain/link/repositories/types/ILinkGetOneResponse';

export interface ILinkRepo {
  linkGetOne: (linkGetOneRequestDTO: ILinkGetOneRequest) => Promise<ILinkGetOneResponse>;
  linkGetAll: () => Promise<ILinkGetAllResponse>;
  linkUpdate: (linkUpdateRequestDTO: ILinkUpdateRequestDTO) => Promise<ILinkUpdateResponseDTO>;
  linkDelete: (linkDeleteRequestDTO: ILinkDeleteRequestDTO) => Promise<ILinkDeleteResponseDTO>;
  linkListGetAll: (linkListGetAllRequestDTO: ILinkListGetAllRequestDTO) => Promise<ILinkListGetAllResponseDTO>;
  linkTagGetAll: (linkTagGetAllRequestDTO: ILinkTagGetAllRequestDTO) => Promise<ILinkTagGetAllResponseDTO>;
}
