import { ILoginUserDTO } from '@domain/ILoginUserDTO';

export interface ILoginUserRepo {
  authenticateUser: (loginUserDTO: ILoginUserDTO) => Promise<[[ILoginUserDTO]]>;
}
