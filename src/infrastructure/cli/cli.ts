import 'module-alias/register';
import figlet from 'figlet';
import prompts from 'prompts';
import { ResetContent } from '@infrastructure/cli/controllers/ResetContent';
import { CreateUser } from '@infrastructure/cli/controllers/CreateUser';
import { HealthCheck } from '@infrastructure/cli/controllers/HealthCheck';
import { exec } from 'child_process';

console.log(figlet.textSync('clean test app'));

const main = async () => {
  const { actions } = await prompts([
    {
      type: 'multiselect',
      name: 'actions',
      message: 'Which action should I take',
      choices: [
        { title: 'Health check', value: 'healthCheck' },
        { title: 'Reset database', value: 'reset' },
        { title: 'Insert user', value: 'insertUser' },
      ],
    },
  ]);

  if (actions.includes('healthCheck')) {
    try {
      const healthCheck = new HealthCheck();
      const response = await healthCheck.execute();
      await console.log('System healthy');
      await console.log(JSON.stringify(response, null, 4));
    } catch (err) {
      await console.log('There was an error checking health');
    }
  }

  if (actions.includes('reset')) {
    try {
      const resetContent = new ResetContent();
      await resetContent.execute();
      await console.log('Reseted database');
    } catch (err) {
      await console.log('There was an error resetting database');
    }
  }

  if (actions.includes('insertUser')) {
    const user = await prompts([
      {
        type: 'text',
        name: 'name',
        message: 'What is your name?',
      },
      {
        type: 'text',
        name: 'surname',
        message: 'What is your surname?',
      },
    ]);

    try {
      const createUser = await new CreateUser(user);
      const result = await createUser.execute();
      await console.log(JSON.stringify(result, null, 4));
    } catch (err) {
      await console.log('There was an error creating user');
    }
  }
  await process.exit(0);
};

main();
