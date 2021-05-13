import { IImageRepo } from '@domain/image/repositories/IImageRepo';
import { IImageSaveOneRequest } from '@domain/image/useCases/interfaces/IImageSaveOneRequest';
import { IImageSaveOneResponse } from '@domain/image/useCases/interfaces/IImageSaveOneResponse';
import { FileDTO } from './FileDTO';

type ImageUrlSplitBySizes = {
  imageUrl: string;
  sizes: {
    height: number;
    width: number;
  }[];
};

type ImageUrlSplitBySizesReturn = {
  [key: string]: string;
};

export class Image extends FileDTO {
  imageRepo: IImageRepo;

  constructor(imageRepo?: IImageRepo) {
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

  formatImageUrl = ({ imageUrl, sizes = [] }: ImageUrlSplitBySizes): ImageUrlSplitBySizesReturn => {
    if (!imageUrl || !imageUrl.length) return {};

    // Default image object
    const accumulator = {
      original: imageUrl,
    };

    // Enhance default image object with urls with sizes
    const imageUrlWithSizes = sizes.reduce(
      (acc, { width, height }) => ({
        ...acc,
        [`w${width}h${height}`]: imageUrl.replace('original', `w${width}h${height}`),
      }),
      accumulator
    );

    return imageUrlWithSizes;
  };
}
