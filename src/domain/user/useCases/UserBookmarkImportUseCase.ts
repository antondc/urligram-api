import { ILinkUpsertOneUseCase } from '@domain/link/useCases/LinkUpsertOneUseCase';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserBookmarkImportRequest } from '@domain/user/useCases/interfaces/IUserBookmarkImportRequest';
import { IUserBookmarkImportResponse } from '@domain/user/useCases/interfaces/IUserBookmarkImportResponse';

export interface IUserBookmarkImportUseCase {
  execute: (bookmarkImportRequest: IUserBookmarkImportRequest) => Promise<IUserBookmarkImportResponse>;
}

export class UserBookmarkImportUseCase implements IUserBookmarkImportUseCase {
  private userRepo: IUserRepo;
  private linkUpsertOneUseCase: ILinkUpsertOneUseCase;

  constructor(userRepo: IUserRepo, linkUpsertOneUseCase: ILinkUpsertOneUseCase) {
    this.userRepo = userRepo;
    this.linkUpsertOneUseCase = linkUpsertOneUseCase;
  }

  public async execute(bookmarkImportRequest: IUserBookmarkImportRequest): Promise<IUserBookmarkImportResponse> {
    const { session, content } = bookmarkImportRequest;

    return [];
  }
}
