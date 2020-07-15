import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserBookmarkCreateRequest } from '@domain/user/useCases/interfaces/IUserBookmarkCreateRequest';
import { IUserBookmarkCreateResponse } from '@domain/user/useCases/interfaces/IUserBookmarkcreateResponse';
import { URLWrapper } from '@infrastructure/services/UrlWrapper';
import { RequestError } from '@shared/errors/RequestError';

export interface IUserBookmarkCreateUseCase {
  execute: (bookmarkCreateRequestDTO: IUserBookmarkCreateRequest) => Promise<IUserBookmarkCreateResponse>;
}

export class UserBookmarkCreateUseCase implements IUserBookmarkCreateUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(bookmarkCreateRequestDTO: IUserBookmarkCreateRequest): Promise<IUserBookmarkCreateResponse> {
    const { url, session, title } = bookmarkCreateRequestDTO;
    const parsedUrl = new URLWrapper(url);
    const domain = parsedUrl.getDomain();
    const path = parsedUrl.getPath() + parsedUrl.getSearch();

    const formattedUserBookmarkCreateRequest = {
      ...bookmarkCreateRequestDTO,
      domain,
      path,
      title: title ? title : domain + path,
    };

    const bookmarkExist = await this.userRepo.userBookmarkGetOne({ ...formattedUserBookmarkCreateRequest, userId: session?.id });

    if (!!bookmarkExist) throw new RequestError('Bookmark already exists', 409, { message: '409 Conflict' });

    const result = await this.userRepo.userBookmarkCreate({ ...formattedUserBookmarkCreateRequest, userId: session.id });

    const response = await this.userRepo.userBookmarkGetOne({ userId: session?.id, bookmarkId: Number(result.bookmarkId) });

    return response;
  }
}
