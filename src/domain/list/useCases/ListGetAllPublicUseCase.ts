import { IListRepo } from '@domain/list/repositories/IListRepo';
import { IListGetAllPublicRequest } from './interfaces/IListGetAllPublicRequest';
import { IListGetAllPublicResponse } from './interfaces/IListGetAllPublicResponse';

export interface IListGetAllPublicUseCase {
  execute: (listGetAllPublicRequest: IListGetAllPublicRequest) => Promise<IListGetAllPublicResponse>;
}

export class ListGetAllPublicUseCase implements IListGetAllPublicUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listGetAllPublicRequest: IListGetAllPublicRequest): Promise<IListGetAllPublicResponse> {
    const { session, sort, size } = listGetAllPublicRequest;

    const response = await this.listRepo.listGetAllPublic({ userId: session?.id, size, sort });

    return response;
  }
}
