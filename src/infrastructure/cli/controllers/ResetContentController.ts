import { ResetContentAdapter } from '@infrastructure/cli/adapters/ResetContentAdapter';
import { ResetContentRepo } from '@infrastructure/persistence/mySQL/repositories/ResetContentRepo';
import { ResetContentUseCase } from '@domain/persistence/useCases/ResetContentUseCase';

export class ResetContentController {
  async execute() {
    const resetContentRepo = new ResetContentRepo();
    const resetContentUseCase = new ResetContentUseCase(resetContentRepo);
    const resetContentAdapter = new ResetContentAdapter(resetContentUseCase);

    const response = await resetContentAdapter.resetContent();

    return response;
  }
}
