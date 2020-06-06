import { HealthCheckAdapter } from '@adapter/HealthCheckAdapter';
import { HealthCheckRepo } from '@infrastructure/persistence/mySQL/repositories/HealthCheckRepo';
import { HealthCheckUseCase } from '@application/HealthCheckUseCase';

export class HealthCheck {
  async execute() {
    const healthCheckRepo = new HealthCheckRepo();
    const healthCheckUseCase = new HealthCheckUseCase(healthCheckRepo);
    const healthCheckAdapter = new HealthCheckAdapter(healthCheckUseCase);

    const response = await healthCheckAdapter.resetContent();

    return response;
  }
}
