import path from 'path';

import config from '@root/config.test.json';
import { toAbsolute } from '@tools/helpers/url/toAbsolute';
import { IImageUploadOneRequest } from './interfaces/IImageUploadOneRequest';
import { IImageUploadOneResponse } from './interfaces/IImageUploadOneResponse';

export interface IImageUploadOneUseCase {
  execute: (imageUploadOneRequest: IImageUploadOneRequest) => Promise<IImageUploadOneResponse>;
}

export class ImageUploadOneUseCase implements IImageUploadOneUseCase {
  public async execute(imageUploadOneRequest: IImageUploadOneRequest): Promise<IImageUploadOneResponse> {
    console.log('=======');
    console.log('imageUploadOneRequest:');
    console.log(JSON.stringify(imageUploadOneRequest, null, 4));
    console.log('=======');

    const { filename } = imageUploadOneRequest;
    const filePath = toAbsolute(path.join(config.TEMP_FILES, filename));

    return {
      image: filePath,
    };
  }
}
