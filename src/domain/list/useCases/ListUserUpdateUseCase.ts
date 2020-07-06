import { IListUserUpdateRequestDTO } from '@domain/list/dto/IListUserUpdateRequestDTO';
import { IListUserUpdateResponseDTO } from '@domain/list/dto/IListUserUpdateResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';

export interface IListUserUpdateUseCase {
  execute: (listUserUpdateRequestDTO: IListUserUpdateRequestDTO) => Promise<IListUserUpdateResponseDTO>;
}

export class ListUserUpdateUseCase implements IListUserUpdateUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listUserUpdateRequestDTO: IListUserUpdateRequestDTO): Promise<IListUserUpdateResponseDTO> {
    const result = await this.listRepo.listUserUpdate(listUserUpdateRequestDTO);

    return result;
  }
}
