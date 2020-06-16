import { IFindUserRequestDTO } from '@domain/user/dto/IFindUserRequestDTO';
import { IFindUserResponseDTO } from '@domain/user/dto/IFindUserResponseDTO';

export interface IFindUserRepo {
  find: (findUserDTO: IFindUserRequestDTO) => Promise<IFindUserResponseDTO>;
}
