import { IResetContentRepo } from '../repositories/IResetContentRepo';

export interface IResetContentUseCase {
  execute: () => void;
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
