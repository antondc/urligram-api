import readline from 'readline';

export class Cli {
  private cli;

  constructor() {
    this.cli = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  question(text: string) {
    return new Promise((resolve) => {
      this.cli.question(text, resolve);
    });
  }

  on(action: string) {
    return new Promise((resolve) => {
      this.cli.on(action, resolve);
    });
  }
}
