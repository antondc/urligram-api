import { IStateRepo } from '@domain/state/repositories/IStateRepo';
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER } from '@shared/constants/env';

export interface IStateHealthCheckUseCase {
  execute: () => unknown;
}

export class StateHealthCheckUseCase {
  private stateRepo: IStateRepo;

  constructor(stateRepo: IStateRepo) {
    this.stateRepo = stateRepo;
  }

  public async execute() {
    const MySQL = await this.stateRepo.healthCheck();
    const Node = process.version;
    const OS = process.platform;
    const EMAIL_HOST_ = '=> ' + EMAIL_HOST;
    const EMAIL_PASSWORD_ = '=> ' + EMAIL_PASSWORD;
    const EMAIL_PORT_ = '=> ' + EMAIL_PORT;
    const EMAIL_USER_ = '=> ' + EMAIL_USER;

    return { MySQL, Node, OS, EMAIL_HOST_, EMAIL_PASSWORD_, EMAIL_PORT_, EMAIL_USER_ };
  }
}
