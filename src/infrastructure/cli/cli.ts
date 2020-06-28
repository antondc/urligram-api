import 'module-alias/register';
import prompts from 'prompts';

import { StateHealthCheckUseCase } from '@domain/state/useCases/StateHealthCheckUseCase';
import { StateResetContentUseCase } from '@domain/state/useCases/StateResetContentUseCase';
import { UserCreateUseCase } from '@domain/user/useCases/UserCreateUseCase';
import { CreateUserController } from '@infrastructure/cli/controllers/CreateUserController';
import { StateHealthCheckController } from '@infrastructure/cli/controllers/StateHealthCheckController';
import { StateResetContentController } from '@infrastructure/cli/controllers/StateResetContentController';
import { StateRepo } from '@infrastructure/persistence/mySQL/repositories/StateRepo';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';

const main = async () => {
  const { actions } = await prompts([
    {
      type: 'multiselect',
      name: 'actions',
      message: 'Which action should I take',
      choices: [
        { title: 'Health check', value: 'healthCheck' },
        { title: 'Reset database', value: 'resetContent' },
        { title: 'Create user', value: 'createUser' },
      ],
    },
  ]);

  if (actions.includes('healthCheck')) {
    try {
      const stateRepo = new StateRepo();
      const healthCheckUseCase = new StateHealthCheckUseCase(stateRepo);
      const healthCheckController = new StateHealthCheckController(healthCheckUseCase);

      const response = await healthCheckController.execute();

      await console.log('System healthy');
      await console.log(JSON.stringify(response, null, 4));
    } catch (err) {
      await console.log('There was an error checking health');
    }
  }

  if (actions.includes('resetContent')) {
    try {
      const stateRepo = new StateRepo();
      const resetContentUseCase = new StateResetContentUseCase(stateRepo);
      const resetContentController = new StateResetContentController(resetContentUseCase);

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
      {
        type: 'text',
        name: 'password_repeated',
        message: 'Please repeat your password',
      },
    ]);

    try {
      const userRepo = new UserRepo();

      const createUserUseCase = new UserCreateUseCase(userRepo);
      const createUserController = new CreateUserController(createUserUseCase, user);

      const response = await createUserController.execute();

      await console.log(JSON.stringify(response, null, 4));
    } catch (err) {
      await console.log('There was an error creating user');
    }
  }
  await process.exit(0);
};

main();
