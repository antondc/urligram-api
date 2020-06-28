import { IStateResetContentUseCase } from '@domain/state/useCases/StateResetContentUseCase';

export class StateResetContentController {
  resetContentUseCase: IStateResetContentUseCase;

  constructor(resetContentUseCase: IStateResetContentUseCase) {
    this.resetContentUseCase = resetContentUseCase;
  }

  async execute() {
    const response = await this.resetContentUseCase.execute();

    return response;
  }
}
