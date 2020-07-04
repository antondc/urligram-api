import { IListGetOneRequestDTO } from '@domain/list/dto/IListGetOneRequestDTO';
import { IListGetOneResponseDTO } from '@domain/list/dto/IListGetOneResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';

export interface IListGetOneUseCase {
  execute: (listGetOneRequestDTO: IListGetOneRequestDTO) => Promise<IListGetOneResponseDTO>;
}

export class ListGetOneUseCase implements IListGetOneUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listGetOneRequestDTO: IListGetOneRequestDTO): Promise<IListGetOneResponseDTO> {
    const response = await this.listRepo.listGetOne(listGetOneRequestDTO);

    return response;
  }
}
