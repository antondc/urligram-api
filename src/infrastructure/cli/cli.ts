import 'module-alias/register';
import prompts from 'prompts';
import { ResetContent } from '@infrastructure/cli/controllers/ResetContentController';
import { CreateUser } from '@infrastructure/cli/controllers/CreateUserController';
import { HealthCheck } from '@infrastructure/cli/controllers/HealthCheckController';

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
