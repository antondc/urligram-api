import { IResetContentUseCase } from '@domain/persistence/useCases/ResetContentUseCase';

export class ResetContentAdapter {
  resetContentUseCase: IResetContentUseCase;

  constructor(resetContentUseCase: IResetContentUseCase) {
    this.resetContentUseCase = resetContentUseCase;
  }

  async resetContent() {
    const response = await this.resetContentUseCase.execute();

    return response;
  }
}
