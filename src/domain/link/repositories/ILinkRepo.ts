import { ILinkCreateRequestDTO } from '@domain/link/dto/ILinkCreateRequestDTO';
import { ILinkCreateResponseDTO } from '@domain/link/dto/ILinkCreateResponseDTO';
import { ILinkDeleteRequestDTO } from '@domain/link/dto/ILinkDeleteRequestDTO';
import { ILinkDeleteResponseDTO } from '@domain/link/dto/ILinkDeleteResponseDTO';
import { ILinkGetAllResponseDTO } from '@domain/link/dto/ILinkGetAllResponseDTO';
import { ILinkGetOneRequestDTO } from '@domain/link/dto/ILinkGetOneRequestDTO';
import { ILinkGetOneResponseDTO } from '@domain/link/dto/ILinkGetOneResponseDTO';

export interface ILinkRepo {
  linkGetOne: (linkGetOneRequestDTO: ILinkGetOneRequestDTO) => Promise<ILinkGetOneResponseDTO>;
  linkGetAll: () => Promise<ILinkGetAllResponseDTO>;
  linkCreate: (linkCreateRequestDTO: ILinkCreateRequestDTO) => Promise<ILinkCreateResponseDTO>;
  linkDelete: (linkDeleteRequestDTO: ILinkDeleteRequestDTO) => Promise<ILinkDeleteResponseDTO>;
}
