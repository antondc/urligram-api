import { IListGetAllResponseDTO } from '@domain/list/dto/IListGetAllResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';

export interface IListGetAllUseCase {
  execute: () => Promise<IListGetAllResponseDTO>;
}

export class ListGetAllUseCase implements IListGetAllUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(): Promise<IListGetAllResponseDTO> {
    const response = await this.listRepo.listGetAll();

    return response;
  }
}
