import 'module-alias/register';
import prompts from 'prompts';
import { ResetContentController } from '@infrastructure/cli/controllers/ResetContentController';
import { StateRepo } from '@infrastructure/persistence/mySQL/repositories/StateRepo';
import { ResetContentUseCase } from '@domain/persistence/useCases/ResetContentUseCase';
import { HealthCheckController } from '@infrastructure/cli/controllers/HealthCheckController';
import { HealthCheckUseCase } from '@domain/persistence/useCases/HealthCheckUseCase';
import { CreateUserController } from '@infrastructure/cli/controllers/CreateUserController';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';
import { CreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';

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
      const stateRepo = new StateRepo();
      const healthCheckUseCase = new HealthCheckUseCase(stateRepo);
      const healthCheckController = new HealthCheckController(healthCheckUseCase);

      const response = await healthCheckController.execute();

      await console.log('System healthy');
      await console.log(JSON.stringify(response, null, 4));
    } catch (err) {
      await console.log('There was an error checking health');
    }
  }

  if (actions.includes('reset')) {
    try {
      const stateRepo = new StateRepo();
      const resetContentUseCase = new ResetContentUseCase(stateRepo);
      const resetContentController = new ResetContentController(resetContentUseCase);

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

      const createUserUseCase = new CreateUserUseCase(userRepo);
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
