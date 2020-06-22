import { IStateRepo } from '@domain/persistence/repositories/IStateRepo';

export interface IHealthCheckUseCase {
  execute: () => unknown;
}

export class HealthCheckUseCase {
  private stateRepo: IStateRepo;

  constructor(stateRepo: IStateRepo) {
    this.stateRepo = stateRepo;
  }

  public async execute() {
    const response = await this.stateRepo.test();

    return response;
  }
}
