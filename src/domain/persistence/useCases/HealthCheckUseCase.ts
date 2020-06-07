import { IHealthCheckRepo } from '../repositories/IHealthCheckRepo';

export interface IHealthCheckUseCase {
  execute: () => void;
}

export class HealthCheckUseCase {
  private healthCheckRepo: IHealthCheckRepo;

  constructor(healthCheckRepo: IHealthCheckRepo) {
    this.healthCheckRepo = healthCheckRepo;
  }

  public async execute() {
    const response = await this.healthCheckRepo.test();

    return response;
  }
}
