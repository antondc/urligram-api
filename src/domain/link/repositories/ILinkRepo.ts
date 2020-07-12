import { ILinkCreateRequestDTO } from '@domain/link/dto/ILinkCreateRequestDTO';
import { ILinkCreateResponseDTO } from '@domain/link/dto/ILinkCreateResponseDTO';
import { ILinkDeleteRequestDTO } from '@domain/link/dto/ILinkDeleteRequestDTO';
import { ILinkDeleteResponseDTO } from '@domain/link/dto/ILinkDeleteResponseDTO';
import { ILinkGetOneRequestDTO } from '@domain/link/dto/ILinkGetOneRequestDTO';
import { ILinkGetOneResponseDTO } from '@domain/link/dto/ILinkGetOneResponseDTO';
import { ILinkListGetAllRequestDTO } from '@domain/link/dto/ILinkListGetAllRequestDTO';
import { ILinkListGetAllResponseDTO } from '@domain/link/dto/ILinkListGetAllResponseDTO';
import { ILinkTagGetAllRequestDTO } from '@domain/link/dto/ILinkTagGetAllRequestDTO';
import { ILinkTagGetAllResponseDTO } from '@domain/link/dto/ILinkTagGetAllResponseDTO';
import { ILinkUpdateRequestDTO } from '@domain/link/dto/ILinkUpdateRequestDTO';
import { ILinkUpdateResponseDTO } from '@domain/link/dto/ILinkUpdateResponseDTO';
import { Link } from '@domain/link/entities/Link';

export interface ILinkRepo {
  linkGetOne: (linkGetOneRequestDTO: ILinkGetOneRequestDTO) => Promise<ILinkGetOneResponseDTO>;
  linkGetAll: () => Promise<Array<Link & { users: { id: string; name: string }[]; tags: { id: number; name: string }[] }>>;
  linkCreate: (linkCreateRequestDTO: ILinkCreateRequestDTO) => Promise<ILinkCreateResponseDTO>;
  linkUpdate: (linkUpdateRequestDTO: ILinkUpdateRequestDTO) => Promise<ILinkUpdateResponseDTO>;
  linkDelete: (linkDeleteRequestDTO: ILinkDeleteRequestDTO) => Promise<ILinkDeleteResponseDTO>;
  linkListGetAll: (linkListGetAllRequestDTO: ILinkListGetAllRequestDTO) => Promise<ILinkListGetAllResponseDTO>;
  linkTagGetAll: (linkTagGetAllRequestDTO: ILinkTagGetAllRequestDTO) => Promise<ILinkTagGetAllResponseDTO>;
}
