import { Request } from 'express';
import Formidable from 'formidable';

import { ImageDTO } from '@domain/image/entities/ImageDTO';
import config from '@root/config.test.json';

export type Fields = {
  [key: string]: string | string[];
};

export type Files = {
  [key: string]: ImageDTO | ImageDTO[];
};

export class FormDataParser {
  private request: Request;
  private formidable: Formidable;

  constructor(request: Request) {
    this.request = request;
    this.formidable = new Formidable({
      uploadDir: config.TEMP_FILES,
      keepExtensions: true,
    });
  }

  async getFormData(): Promise<{
    fields: Fields;
    files: {
      [key: string]: ImageDTO | ImageDTO[];
    };
  }> {
    const formData: { fields: Fields; files: Files } = await new Promise((resolve, reject) => {
      this.formidable.parse(this.request, (err, fields, files) => {
        if (err) {
          reject(err);

          return;
        }

        return resolve({ fields, files });
      });
    });

    return {
      fields: formData.fields,
      files: formData.files,
    };
  }

  async getSingleImage(): Promise<{ [key: string]: ImageDTO }> {
    const formData: {
      files: {
        [key: string]: ImageDTO;
      };
    } = await new Promise((resolve, reject) => {
      this.formidable.parse(this.request, (err, _, files) => {
        if (err) {
          reject(err);

          return;
        }

        // Each file can be an image object or an array of them; we want only one object
        const filesInFiles = Object.entries(files).reduce((acc, [key, value]) => {
          acc[key] = Array.isArray(value) ? value[0] : value;

          return acc;
        }, {});

        return resolve({ files: filesInFiles });
      });
    });

    return formData.files;
  }
}
