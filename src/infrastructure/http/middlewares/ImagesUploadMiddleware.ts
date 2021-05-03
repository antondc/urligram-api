import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import config from '@root/config.test.json';
import { getExtension } from '@tools/helpers/file/getExtension';

const storage = multer.diskStorage({
  // Upload to temp_files folder
  destination: (req, file, cb) => {
    cb(null, config.TEMP_FILES);
  },
  // Set custom filename
  filename: (req, file, cb) => {
    const randomString = uuidv4();
    const extension = getExtension(file?.originalname);
    cb(null, `${randomString}.${extension}`);
  },
});

const multerInstance = multer({ storage: storage });

export const imagesUploadAnyMiddleware = multerInstance.any();
export const imagesUploadOneMiddleware = multerInstance.single('image');

export type ImageUploaded = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};
