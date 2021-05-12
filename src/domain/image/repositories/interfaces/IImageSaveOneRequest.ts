import { ImageFormatOptions } from '@domain/image/entities/protocols/FormatOptions';

export type IImageSaveOneRequest = {
  fileUrl: string;
  formatOptions: ImageFormatOptions;
};
