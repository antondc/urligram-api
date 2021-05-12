import { IImageRepo } from '@domain/image/repositories/IImageRepo';
import { IImageSaveOneRequest } from '@domain/image/useCases/interfaces/IImageSaveOneRequest';
import { IImageSaveOneResponse } from '@domain/image/useCases/interfaces/IImageSaveOneResponse';
import { FileDTO } from './FileDTO';

export class Image extends FileDTO {
  imageRepo: IImageRepo;

  constructor(imageRepo: IImageRepo) {
    super();
    this.imageRepo = imageRepo;
    // Here we may use the received url and create on instantiation the resolution url tree
    // On other models, on this.image = new Image(imageUrl), this.image would automatically receive the tree
  }

  async saveImage(imageSaveOneRequest: IImageSaveOneRequest): Promise<IImageSaveOneResponse> {
    const image = await this.imageRepo.saveImage(imageSaveOneRequest);

    return image;
  }

  deleteImage = (): void => {
    // Remove image from filesystem
    // This may go to a more general File class

    return null;
  };

  setImageProfile = (): void => {
    return null;
  };

  getImage = (): void => {
    return null;
  };
}
