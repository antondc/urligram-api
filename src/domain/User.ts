export class User {
  name: string;
  surname: string;

  constructor(createUserDTO) {
    this.name = createUserDTO.name;
    this.surname = createUserDTO.surname;
  }
}
