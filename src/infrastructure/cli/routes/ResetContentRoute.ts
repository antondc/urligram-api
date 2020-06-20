import { ResetContentController } from '@infrastructure/cli/controllers/ResetContentController';
import { ResetContentRepo } from '@infrastructure/persistence/mySQL/repositories/ResetContentRepo';
import { ResetContentUseCase } from '@domain/persistence/useCases/ResetContentUseCase';

export class ResetContentRoute {
  async execute() {
    const resetContentRepo = new ResetContentRepo();
    const resetContentUseCase = new ResetContentUseCase(resetContentRepo);
    const resetContentController = new ResetContentController(resetContentUseCase);

    const response = await resetContentController.resetContent();

    return response;
  }
}
