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
    file.originalname.split('.')[0] + '.webp';
  mkdirp.sync(destination + '/main');
  mkdirp.sync(destination + '/resized');

  await sharp(file.buffer).webp().toFile(destination + '/main/' + fileName);
  await sharp(file.buffer).webp()
    .resize({ height: body.height || 200, width: body.width || 200 })
    .toFile(destination + '/resized/' + fileName);

  return fileName;
};
