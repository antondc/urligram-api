import { IStateRepo } from '@domain/state/repositories/IStateRepo';

export interface IStateHealthCheckUseCase {
  execute: () => unknown;
}

export class StateHealthCheckUseCase {
  private stateRepo: IStateRepo;

  constructor(stateRepo: IStateRepo) {
    this.stateRepo = stateRepo;
  }

  public async execute() {
    const response = await this.stateRepo.healthCheck();

    return response;
  }
}
