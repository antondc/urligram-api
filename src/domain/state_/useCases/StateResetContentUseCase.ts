import { IStateRepo } from '@domain/state/repositories/IStateRepo';

export interface IStateResetContentUseCase {
  execute: () => unknown;
}

export class StateResetContentUseCase {
  private stateRepo: IStateRepo;

  constructor(stateRepo: IStateRepo) {
    this.stateRepo = stateRepo;
  }

  public async execute() {
    const response = await this.stateRepo.resetContent();

    return response;
  }
}
