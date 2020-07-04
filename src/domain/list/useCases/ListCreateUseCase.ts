import { IListCreateRequestDTO } from '@domain/list/dto/IListCreateRequestDTO';
import { IListCreateResponseDTO } from '@domain/list/dto/IListCreateResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';

export interface IListCreateUseCase {
  execute: (listCreateRequestDTO: IListCreateRequestDTO) => Promise<IListCreateResponseDTO>;
}

export class ListCreateUseCase implements IListCreateUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listCreateRequestDTO: IListCreateRequestDTO): Promise<IListCreateResponseDTO> {
    // const listExist = await this.listRepo.listCreate(listCreateRequestDTO);

    // if (!!listExist) throw new RequestError('List already exists', 409, { message: '409 Conflict' });

    const result = await this.listRepo.listCreate(listCreateRequestDTO);

    // const listGetOneRequestDTO = {
    //   id: Number(result?.id),
    // };

    // const response = await this.listRepo.listCreate(listGetOneRequestDTO);

    return result;
  }
}
