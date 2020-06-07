import { IResetContentRepo } from '../repositories/IResetContentRepo';

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
