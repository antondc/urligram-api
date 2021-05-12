import { FileDTO } from '@domain/image/entities/FileDTO';

export interface IImageUploadOneResponse extends FileDTO {
  path: string;
}
