import { IUserDTO } from './IUserDTO';
import { IUser } from './IUser';

export class User implements IUser {
  name: string;
  surname: string;

  constructor(data: IUserDTO) {
    this.name = data.name;
    this.surname = data.surname;
  }
}
