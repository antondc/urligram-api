import { ImageDTO } from './ImageDTO';

export type ImageFormatOptions = {
  extension: 'png' | 'jpg';
  sizes: {
    h: number;
    w: number;
  }[];
  crop: 'crop' | 'center';
  folderName: string;
};

export class Image extends ImageDTO {
  formatOptions?: ImageFormatOptions;

  constructor(formatOptions: ImageFormatOptions) {
    super();
    this.formatOptions = formatOptions;
    // Here we may user the received url and create on instantiation the resolution url tree
    // On other models, on this.image = new Image(imageUrl), this.image would automatically receive the tree
  }

  saveImage = (
    path: string
  ): {
    size: number;
    path: string;
    name: string;
    type: string;
  } => {
    console.log(path);
    // Retrieve image from temp folder
    // If no image, return

    // resizeImage()
    // saveImageInFolder()
    return {
      size: 1233,
      path: '',
      name: '',
      type: '',
    };
  };

  getImage = (): void => {
    // Convert url string into different urls depending on different provided sizes
    return null;
  };

  deleteImage = (): void => {
    // Remove image from filesystem
    // This may go to a more general File class

    return null;
  };

  resizeImage = (): void => {
    // Use Jimp or similar to format image

    return null;
  };

  saveImageInFolder = (): void => {
    // Use node to save file to file system
    // This may go to a more general File class
    return null;
  };

  setImageProfile = (): void => {
    return null;
  };
}
