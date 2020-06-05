import { IResetContentUseCase } from '@application/IResetContentUseCase';

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
