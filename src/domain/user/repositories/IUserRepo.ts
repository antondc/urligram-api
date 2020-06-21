import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';

export interface IUserRepo {
  create: (createUserDTO: ICreateUserRequestDTO) => Promise<ICreateUserResponseDTO>;
}
