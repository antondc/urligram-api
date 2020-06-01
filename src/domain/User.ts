import { ICreateUserDTO } from 'Root/src/application/ICreateUserDTO';

export class User {
  name: string;
  surname: string;

  constructor(data: ICreateUserDTO) {
    this.name = data.name;
    this.surname = data.surname;
  }
}
