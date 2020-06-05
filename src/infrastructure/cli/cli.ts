import 'module-alias/register';
import figlet from 'figlet';
import { Cli } from '@infrastructure/services/Cli';

const cli = new Cli();

console.log(figlet.textSync('clean test app'));

const main = async () => {
  const name = await cli.question('What is your name ? ');
  const surname = await cli.question('What is your surname ? ');
  console.log('This is your stuff: ', JSON.stringify({ name, surname }, null, 4));

  await process.exit(0);
};

main();
