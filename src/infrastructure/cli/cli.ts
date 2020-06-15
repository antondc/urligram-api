import 'module-alias/register';
import prompts from 'prompts';
import { ResetContentController } from '@infrastructure/cli/controllers/ResetContentController';
import { CreateUserController } from '@infrastructure/cli/controllers/CreateUserController';
import { HealthCheckController } from '@infrastructure/cli/controllers/HealthCheckController';

const main = async () => {
  const { actions } = await prompts([
    {
      type: 'multiselect',
      name: 'actions',
      message: 'Which action should I take',
      choices: [
        { title: 'Health check', value: 'healthCheck' },
        { title: 'Reset database', value: 'reset' },
        { title: 'Create user', value: 'createUser' },
      ],
    },
  ]);

  if (actions.includes('healthCheck')) {
    try {
      const healthCheckController = new HealthCheckController();
      const response = await healthCheckController.execute();
      await console.log('System healthy');
      await console.log(JSON.stringify(response, null, 4));
    } catch (err) {
      await console.log('There was an error checking health');
    }
  }

  if (actions.includes('reset')) {
    try {
      const resetContentController = new ResetContentController();
      await resetContentController.execute();
      await console.log('Reseted database');
    } catch (err) {
      await console.log('There was an error resetting database');
    }
  }

  if (actions.includes('createUser')) {
    const user = await prompts([
      {
        type: 'text',
        name: 'name',
        message: 'What is your name?',
      },
      {
        type: 'text',
        name: 'email',
        message: 'What is your email?',
      },
      {
        type: 'text',
        name: 'password',
        message: 'What is your password?',
      },
    ]);

    try {
      const createUserController = await new CreateUserController(user);
      const result = await createUserController.execute();
      await console.log(JSON.stringify(result, null, 4));
    } catch (err) {
      await console.log('There was an error creating user');
    }
  }
  await process.exit(0);
};

main();
