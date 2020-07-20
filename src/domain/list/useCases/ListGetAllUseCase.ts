import { IListRepo } from '@domain/list/repositories/IListRepo';
import { IListGetAllRequest } from './interfaces/IListGetAllRequest';
import { IListGetAllResponse } from './interfaces/IListGetAllResponse';

export interface IListGetAllUseCase {
  execute: (listGetAllRequest: IListGetAllRequest) => Promise<IListGetAllResponse>;
}

export class ListGetAllUseCase implements IListGetAllUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listGetAllRequest: IListGetAllRequest): Promise<IListGetAllResponse> {
    const { session } = listGetAllRequest;
    const response = await this.listRepo.listGetAll({ userId: session?.id });

    return response;
  }
}
