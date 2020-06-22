import { IStateRepo } from '@domain/persistence/repositories/IStateRepo';

export interface IResetContentUseCase {
  execute: () => unknown;
}

export class ResetContentUseCase {
  private stateRepo: IStateRepo;

  constructor(stateRepo: IStateRepo) {
    this.stateRepo = stateRepo;
  }

  public async execute() {
    const response = await this.stateRepo.reset();

    return response;
  }
}
