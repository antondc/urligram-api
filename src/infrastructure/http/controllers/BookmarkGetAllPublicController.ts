import { Request, Response } from 'express';

import { IBookmarkGetAllPublicUseCase } from '@domain/bookmark/useCases/BookmarkGetAllPublicUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class BookmarkGetAllPublicController extends BaseController {
  useCase: IBookmarkGetAllPublicUseCase;

  constructor(useCase: IBookmarkGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const response = await this.useCase.execute();

    const formattedBookmarks = response.map((item) => {
      return {
        type: 'bookmark',
        id: item.id,
        session: {
          self: URL_SERVER + '/bookmarks/' + item.id,
        },
        attributes: item,
      };
    });

    const formattedResponse = {
      Bookmarks: {
        self: URL_SERVER + '/bookmarks',
      },
      data: formattedBookmarks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
