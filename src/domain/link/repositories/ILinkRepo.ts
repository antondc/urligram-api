import { ILinkGetOneRequestDTO } from '@domain/link/dto/ILinkGetOneRequestDTO';
import { ILinkGetOneResponseDTO } from '@domain/link/dto/ILinkGetOneResponseDTO';

export interface ILinkRepo {
  linkGetOne: (linkGetOneRequestDTO: ILinkGetOneRequestDTO) => Promise<ILinkGetOneResponseDTO>;
}
