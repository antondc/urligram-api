import { ILoginUserDTO } from '@domain/ILoginUserDTO';

export interface ILoginUserUseCase {
  execute: (loginUserDTO: ILoginUserDTO) => Promise<ILoginUserRepo>;
}
