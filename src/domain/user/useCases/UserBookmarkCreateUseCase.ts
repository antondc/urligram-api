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

    const bookmarkExist = await this.userRepo.userBookmarkGetOneByUserIdPathDomain({
      path,
      domain,
      userId: session?.id,
    });
    if (!!bookmarkExist) throw new RequestError('Bookmark already exists', 409, { message: '409 Conflict' }); // (1)

    const result = await this.userRepo.userBookmarkCreate({ ...formattedUserBookmarkCreateRequest, userId: session.id });

    const response = await this.userRepo.userBookmarkGetOneByBookmarkIdUserId({
      bookmarkId: result.bookmarkId,
      userId: session?.id,
    });

    return response;
  }
}

/* --- DOC ---
  Creates a a bookmark
  Exeptions
    (1) Bookmark don't exist for this user
*/
