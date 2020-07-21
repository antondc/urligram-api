import { IListRepo } from '@domain/list/repositories/IListRepo';
import { IListGetAllPublicResponse } from './interfaces/IListGetAllPublicResponse';

export interface IListGetAllPublicUseCase {
  execute: () => Promise<IListGetAllPublicResponse>;
}

export class ListGetAllPublicUseCase implements IListGetAllPublicUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(): Promise<IListGetAllPublicResponse> {
    const response = await this.listRepo.listGetAllPublic();

    return response;
  }
}
