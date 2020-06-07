import { ILoginUserDTO } from '@domain/user/dto/ILoginUserDTO';

export interface ILoginUserRepo {
  authenticateUser: (loginUserDTO: ILoginUserDTO) => Promise<ILoginUserDTO>;
}
