import 'module-alias/register';
import prompts from 'prompts';
import { ResetContentRoute } from '@infrastructure/cli/routes/ResetContentRoute';
import { CreateUserRoute } from '@infrastructure/cli/routes/CreateUserRoute';
import { HealthCheckRoute } from '@infrastructure/cli/routes/HealthCheckRoute';

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
      const healthCheckRoute = new HealthCheckRoute();
      const response = await healthCheckRoute.execute();
      await console.log('System healthy');
      await console.log(JSON.stringify(response, null, 4));
    } catch (err) {
      await console.log('There was an error checking health');
    }
  }

  if (actions.includes('reset')) {
    try {
      const resetContentRoute = new ResetContentRoute();
      await resetContentRoute.execute();
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
      {
        type: 'text',
        name: 'password_repeated',
        message: 'Please repeat your password',
      },
    ]);

    try {
      const createUserRoute = await new CreateUserRoute(user);
      const result = await createUserRoute.execute();
      await console.log(JSON.stringify(result, null, 4));
    } catch (err) {
      await console.log('There was an error creating user');
    }
  }
  await process.exit(0);
};

main();
