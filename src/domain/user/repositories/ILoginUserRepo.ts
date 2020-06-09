import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILoginUserResponseDTO } from '@domain/user/dto/ILoginUserResponseDTO';

export interface ILoginUserRepo {
  authenticateUser: (loginUserDTO: ILoginUserRequestDTO) => Promise<ILoginUserResponseDTO>;
}
