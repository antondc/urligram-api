import { ResetContentAdapter } from '@adapter/ResetContentAdapter';
import { ResetContentRepo } from '@infrastructure/persistence/mySQL/repositories/ResetContentRepo';
import { ResetContentUseCase } from '@application/ResetContentUseCase';

export class ResetContent {
  async execute() {
    const resetContentRepo = new ResetContentRepo();
    const resetContentUseCase = new ResetContentUseCase(resetContentRepo);
    const resetContentAdapter = new ResetContentAdapter(resetContentUseCase);

    const response = await resetContentAdapter.resetContent();

    return response;
  }
}
