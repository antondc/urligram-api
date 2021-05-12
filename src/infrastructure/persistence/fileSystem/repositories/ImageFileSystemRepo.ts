import fs from 'fs';
import Jimp from 'jimp';
import mkdirp from 'mkdirp';
import path from 'path';

import { IImageRepo } from '@domain/image/repositories/IImageRepo';
import { IImageSaveOneRequest } from '@domain/image/repositories/interfaces/IImageSaveOneRequest';
import { IImageSaveOneResponse } from '@domain/image/repositories/interfaces/IImageSaveOneResponse';
import config from '@root/config.test.json';
import { URL_SERVER } from '@shared/constants/env';
import { URLWrapper } from '@shared/services/UrlWrapper';

export class ImageFileSystemRepo implements IImageRepo {
  public async saveImage(imageSaveOneRequest: IImageSaveOneRequest): Promise<IImageSaveOneResponse> {
    const myUrl = new URLWrapper(imageSaveOneRequest.fileUrl);
    const filename = myUrl.getFilename();
    const originPath = path.join(config.TEMP_FILES, filename);
    const imageExists = fs.existsSync(originPath);
    if (!imageExists) throw new Error('Image does not exist');

    const file = fs.createReadStream(originPath);
    const destinationOriginalPath = path.join(config.MEDIA_IMAGES, imageSaveOneRequest.formatOptions?.destinationFolder, 'original');
    const destinationOriginalPathExists = fs.existsSync(destinationOriginalPath);
    if (!destinationOriginalPathExists) mkdirp.sync(destinationOriginalPath);

    const finalFilePath = path.join(destinationOriginalPath, filename);
    const outStream = fs.createWriteStream(finalFilePath);

    file.pipe(outStream);

    await this.saveAndResize(originPath, filename, imageSaveOneRequest.formatOptions);

    fs.unlinkSync(originPath); // Remove original temp image

    return {
      path: `${URL_SERVER}/${finalFilePath}`,
    };
  }

  private async saveAndResize(originPath, filename, formatOptions): Promise<void> {
    if (!formatOptions?.sizes) return;

    await formatOptions.sizes.forEach(async (item) => {
      const image = await Jimp.read(originPath);

      // Define mime type
      let mime;
      switch (formatOptions.extension) {
        case 'png':
          mime = Jimp.MIME_PNG;
          break;
        case 'jpg':
        default:
          mime = Jimp.MIME_JPEG;
          break;
      }
      const destinationPath = path.join(config.MEDIA_IMAGES, formatOptions?.destinationFolder, 'w' + item.width);
      const destinationPathExists = fs.existsSync(destinationPath);
      if (!destinationPathExists) mkdirp.sync(destinationPath);

      const finalPath = path.join(destinationPath, filename);
      await image.scaleToFit(item.width, item.height);
      await image.getBuffer(mime, (err, buff) => fs.writeFileSync(finalPath, buff));
    });

    return;
  }

  async deleteImage() {
    return;
  }
}
