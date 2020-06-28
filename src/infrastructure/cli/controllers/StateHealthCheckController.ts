import { IStateHealthCheckUseCase } from '@domain/state/useCases/StateHealthCheckUseCase';

export class StateHealthCheckController {
  healthCheckUseCase: IStateHealthCheckUseCase;

  constructor(healthCheckUseCase: IStateHealthCheckUseCase) {
    this.healthCheckUseCase = healthCheckUseCase;
  }

  async execute() {
    const response = await this.healthCheckUseCase.execute();

    return response;
  }
}
