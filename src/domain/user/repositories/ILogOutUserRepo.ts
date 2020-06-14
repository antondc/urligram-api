import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { ILogOutUserResponseDTO } from '@domain/user/dto/ILogOutUserResponseDTO';

export interface ILogOutUserRepo {
  deauthenticate: (loginUserDTO: ILogOutUserRequestDTO) => Promise<ILogOutUserResponseDTO>;
}
