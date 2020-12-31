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
    const MySQL = await this.stateRepo.healthCheck();
    const node = process.version;

    return { MySQL, node };
  }
}
