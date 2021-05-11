import fs from 'fs';
import Jimp from 'jimp';
import mkdirp from 'mkdirp';
import path from 'path';

import config from '@root/config.test.json';
import { URL_SERVER } from '@shared/constants/env';
import { URLWrapper } from '@shared/services/UrlWrapper';
import { ImageDTO } from './ImageDTO';

export type ImageFormatOptions = {
  extension: 'png' | 'jpg';
  sizes: {
    h: number;
    w: number;
  }[];
  crop: 'crop' | 'center';
  destinationFolder: string;
};

export class Image extends ImageDTO {
  formatOptions?: ImageFormatOptions;

  constructor(formatOptions: ImageFormatOptions) {
    super();
    this.formatOptions = formatOptions;
    // Here we may use the received url and create on instantiation the resolution url tree
    // On other models, on this.image = new Image(imageUrl), this.image would automatically receive the tree
  }

  saveImage = async ({
    fileUrl, // Must be a full url
  }: {
    fileUrl: string;
  }): Promise<{
    path: string;
  }> => {
    const myUrl = new URLWrapper(fileUrl);
    const filename = myUrl.getFilename();
    const originPath = path.join(config.TEMP_FILES, filename);
    const imageExists = fs.existsSync(originPath);
    if (!imageExists) throw new Error('Image does not exist');

    const file = fs.createReadStream(originPath);
    const destinationOriginalPath = path.join(config.MEDIA_IMAGES, this.formatOptions?.destinationFolder, 'original');
    const destinationOriginalPathExists = fs.existsSync(destinationOriginalPath);
    if (!destinationOriginalPathExists) mkdirp.sync(destinationOriginalPath);

    const finalFilePath = path.join(destinationOriginalPath, filename);
    const outStream = fs.createWriteStream(finalFilePath);

    file.pipe(outStream);

    await this.resizeImageAndSave(originPath, filename);

    fs.unlinkSync(originPath); // Remove original temp image

    return {
      path: `${URL_SERVER}/${finalFilePath}`,
    };
  };

  resizeImageAndSave = async (originPath, filename): Promise<void> => {
    if (!this.formatOptions?.sizes) return;

    await this.formatOptions.sizes.forEach(async (item) => {
      const image = await Jimp.read(originPath);

      // Define mime type
      let mime;
      switch (this.formatOptions.extension) {
        case 'png':
          mime = Jimp.MIME_PNG;
          break;
        case 'jpg':
        default:
          mime = Jimp.MIME_JPEG;
          break;
      }
      const destinationPath = path.join(config.MEDIA_IMAGES, this.formatOptions?.destinationFolder, 'w' + item.w);
      const destinationPathExists = fs.existsSync(destinationPath);
      if (!destinationPathExists) mkdirp.sync(destinationPath);
      const finalPath = path.join(destinationPath, filename);

      // Currently scale to fit on format
      image.scaleToFit(item.w, item.h).getBuffer(mime, (err, buff) => {
        fs.writeFileSync(finalPath, buff);
      });
    });

    return;
  };

  deleteImage = (): void => {
    // Remove image from filesystem
    // This may go to a more general File class

    return null;
  };

  setImageProfile = (): void => {
    return null;
  };
}
