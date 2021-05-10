import { Request } from 'express';
import Formidable from 'formidable';

import { Image } from '@domain/images/entities/Image';
import config from '@root/config.test.json';

export type Fields = {
  [key: string]: string | string[];
};

export type Files = {
  [key: string]: Image | Image[];
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
      [key: string]: Image | Image[];
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

  async getSingleImage(): Promise<{ [key: string]: Image }> {
    const formData: {
      files: {
        [key: string]: Image;
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
