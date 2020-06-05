import { ResetContentController } from '@adapter/ResetContentController';
import { ResetContentRepo } from '@infrastructure/persistence/mySQL/repositories/ResetContentRepo';
import { ResetContentUseCase } from '@application/ResetContentUseCase';

export class ResetContent {
  async execute() {
    const resetContentRepo = new ResetContentRepo();
    const resetContentUseCase = new ResetContentUseCase(resetContentRepo);
    const resetContentController = new ResetContentController(resetContentUseCase);

    const response = await resetContentController.resetContent();

    return response;
  }
}
