import fs from 'fs';
import Jimp from 'jimp';
import mkdirp from 'mkdirp';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { IFileRepo } from '@domain/file/repositories/IFileRepo';
import { IFileSaveInTempFolderRequest } from '@domain/file/repositories/interfaces/IFileSaveInTempFolderRequest';
import { IFileSaveInTempFolderResponse } from '@domain/file/repositories/interfaces/IFileSaveInTempFolderResponse';
import { IImageSaveOneRequest } from '@domain/file/repositories/interfaces/IFileSaveOneRequest';
import { IImageSaveOneResponse } from '@domain/file/repositories/interfaces/IFileSaveOneResponse';
import config from '@root/config.test.json';
import { MS_30_MINS } from '@shared/constants/constants';
import { URL_SERVER } from '@shared/constants/env';
import { ServerError } from '@shared/errors/ServerError';
import { URLWrapper } from '@shared/services/UrlWrapper';

export class FileRepo implements IFileRepo {
  public async imageSave(imageSaveOneRequest: IImageSaveOneRequest): Promise<IImageSaveOneResponse> {
    const myUrl = new URLWrapper(imageSaveOneRequest.fileUrl);
    const filename = myUrl.getFilename();
    const originPath = path.join(config.TEMP_FILES, filename);
    const imageExists = fs.existsSync(originPath);
    if (!imageExists) throw new ServerError('Image does not exist', 500);

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
      const destinationPath = path.join(config.MEDIA_IMAGES, formatOptions?.destinationFolder, `w${item.width}h${item.height}`);
      const destinationPathExists = fs.existsSync(destinationPath);
      if (!destinationPathExists) mkdirp.sync(destinationPath);

      const finalPath = path.join(destinationPath, filename);
      await image.scaleToFit(item.width, item.height);
      await image.getBuffer(mime, (err, buff) => fs.writeFileSync(finalPath, buff));
    });

    return;
  }

  async imageDelete() {
    return;
  }

  async fileSaveInTempFolder(fileSaveInTempFolderRequest: IFileSaveInTempFolderRequest): Promise<IFileSaveInTempFolderResponse> {
    const { content, extension } = fileSaveInTempFolderRequest.file;
    const name = `${uuidv4()}.${extension}`;
    const destinationPath = path.join(config.TEMP_FILES);
    const destinationPathExists = fs.existsSync(destinationPath);
    if (!destinationPathExists) mkdirp.sync(destinationPath);

    const finalFilePath = path.join(destinationPath, name);
    await fs.promises.writeFile(finalFilePath, content, 'binary');

    const finalFilePathExists = fs.existsSync(finalFilePath);
    if (!finalFilePathExists) throw new ServerError('Image saving failed', 500);

    // Remove file after 30 mins
    setTimeout(() => fs.promises.unlink(finalFilePath), MS_30_MINS);

    return {
      path: finalFilePath,
    };
  }
}
