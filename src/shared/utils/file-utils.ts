import sharp from 'sharp';
import * as mkdirp from 'mkdirp';
import { UploadFileDto } from '../dtos/upload-file.dto';

export const saveImage = async (
  file: Express.Multer.File,
  body: UploadFileDto,
) => {
  const destination = './file/' + body.folder;
  const fileName =
    new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-') +
    '-' +
    file.originalname;
  mkdirp.sync(destination);

  await sharp(file.buffer).toFile(destination + '/' + fileName);

  return fileName;
};
