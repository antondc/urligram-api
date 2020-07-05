import { ILinkCreateRequestDTO } from '@domain/link/dto/ILinkCreateRequestDTO';
import { ILinkCreateResponseDTO } from '@domain/link/dto/ILinkCreateResponseDTO';
import { ILinkDeleteRequestDTO } from '@domain/link/dto/ILinkDeleteRequestDTO';
import { ILinkDeleteResponseDTO } from '@domain/link/dto/ILinkDeleteResponseDTO';
import { ILinkGetAllResponseDTO } from '@domain/link/dto/ILinkGetAllResponseDTO';
import { ILinkGetOneRequestDTO } from '@domain/link/dto/ILinkGetOneRequestDTO';
import { ILinkGetOneResponseDTO } from '@domain/link/dto/ILinkGetOneResponseDTO';
import { ILinkListGetAllRequestDTO } from '@domain/link/dto/ILinkListGetAllRequestDTO';
import { ILinkListGetAllResponseDTO } from '@domain/link/dto/ILinkListGetAllResponseDTO';
import { ILinkUpdateRequestDTO } from '@domain/link/dto/ILinkUpdateRequestDTO';
import { ILinkUpdateResponseDTO } from '@domain/link/dto/ILinkUpdateResponseDTO';

export interface ILinkRepo {
  linkGetOne: (linkGetOneRequestDTO: ILinkGetOneRequestDTO) => Promise<ILinkGetOneResponseDTO>;
  linkGetAll: () => Promise<ILinkGetAllResponseDTO>;
  linkCreate: (linkCreateRequestDTO: ILinkCreateRequestDTO) => Promise<ILinkCreateResponseDTO>;
  linkUpdate: (linkUpdateRequestDTO: ILinkUpdateRequestDTO) => Promise<ILinkUpdateResponseDTO>;
  linkDelete: (linkDeleteRequestDTO: ILinkDeleteRequestDTO) => Promise<ILinkDeleteResponseDTO>;
  linkListGetAll: (linkListGetAllRequestDTO: ILinkListGetAllRequestDTO) => Promise<ILinkListGetAllResponseDTO>;
}
