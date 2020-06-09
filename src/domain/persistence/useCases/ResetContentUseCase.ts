import { IResetContentRepo } from '@domain/persistence/repositories/IResetContentRepo';

export interface IResetContentUseCase {
  execute: () => unknown;
}

export class ResetContentUseCase {
  private resetContentRepo: IResetContentRepo;

  constructor(resetContentRepo: IResetContentRepo) {
    this.resetContentRepo = resetContentRepo;
  }

  public async execute() {
    const response = await this.resetContentRepo.reset();

    return response;
  }
}
