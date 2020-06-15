import { IHealthCheckUseCase } from '@domain/persistence/useCases/HealthCheckUseCase';

export class HealthCheckAdapter {
  healthCheckUseCase: IHealthCheckUseCase;

  constructor(healthCheckUseCase: IHealthCheckUseCase) {
    this.healthCheckUseCase = healthCheckUseCase;
  }

  async resetContent() {
    const response = await this.healthCheckUseCase.execute();

    return response;
  }
}
