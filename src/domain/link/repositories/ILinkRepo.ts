import { ILinkCreateRequestDTO } from '@domain/link/dto/ILinkCreateRequestDTO';
import { ILinkCreateResponseDTO } from '@domain/link/dto/ILinkCreateResponseDTO';
import { ILinkGetAllResponseDTO } from '@domain/link/dto/ILinkGetAllResponseDTO';
import { ILinkGetOneRequestDTO } from '@domain/link/dto/ILinkGetOneRequestDTO';
import { ILinkGetOneResponseDTO } from '@domain/link/dto/ILinkGetOneResponseDTO';

export interface ILinkRepo {
  linkGetOne: (linkGetOneRequestDTO: ILinkGetOneRequestDTO) => Promise<ILinkGetOneResponseDTO>;
  linkGetAll: () => Promise<ILinkGetAllResponseDTO>;
  linkCreate: (linkCreateRequestDTO: ILinkCreateRequestDTO) => Promise<ILinkCreateResponseDTO>;
}
