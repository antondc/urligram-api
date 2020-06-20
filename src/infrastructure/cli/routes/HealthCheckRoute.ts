import { HealthCheckController } from '@infrastructure/cli/controllers/HealthCheckController';
import { HealthCheckRepo } from '@infrastructure/persistence/mySQL/repositories/HealthCheckRepo';
import { HealthCheckUseCase } from '@domain/persistence/useCases/HealthCheckUseCase';

export class HealthCheckRoute {
  async execute() {
    const healthCheckRepo = new HealthCheckRepo();
    const healthCheckUseCase = new HealthCheckUseCase(healthCheckRepo);
    const healthCheckController = new HealthCheckController(healthCheckUseCase);

    const response = await healthCheckController.resetContent();

    return response;
  }
}
