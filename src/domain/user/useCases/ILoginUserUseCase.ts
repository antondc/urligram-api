import { ILoginUserDTO } from '@domain/user/dto/ILoginUserDTO';

export interface ILoginUserUseCase {
  execute: (loginUserDTO: ILoginUserDTO) => Promise<[[ILoginUserDTO]]>;
}
