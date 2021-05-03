import { Request, Response } from 'express';

import { IImageUploadOneUseCase } from '@domain/images/useCases/ImageUploadOneUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';
export class ImageUploadOneController extends BaseController {
  useCase: IImageUploadOneUseCase;

  constructor(useCase: IImageUploadOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { file } = req;

    const response = await this.useCase.execute(file);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/images/upload/single',
      },
      data: {
        image: URL_SERVER + response?.image,
      },
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
