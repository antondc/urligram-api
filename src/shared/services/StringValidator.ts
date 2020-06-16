export class StringValidator {
  value: string | number;
  emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(value: string | number) {
    this.value = value;
  }

  public testEmail() {
    const formattedString = String(this.value).toLowerCase();

    const result = this.emailRegex.test(formattedString);

    return result;
  }
}
