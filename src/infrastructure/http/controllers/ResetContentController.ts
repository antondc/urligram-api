import { IResetContentUseCase } from '@domain/persistence/useCases/ResetContentUseCase';

export class ResetContentController {
  resetContentUseCase: IResetContentUseCase;

  constructor(resetContentUseCase: IResetContentUseCase) {
    this.resetContentUseCase = resetContentUseCase;
  }

  async execute() {
    const response = await this.resetContentUseCase.execute();

    return response;
  }
}
