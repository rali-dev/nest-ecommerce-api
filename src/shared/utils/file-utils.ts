import sharp from 'sharp';
import * as mkdirp from 'mkdirp';
import { UploadFileDto } from '../dtos/upload-file.dto';
import { UploadFilesDto } from '../dtos/upload-files.dto';
import * as fs from 'fs';
export const saveImage = async (
  file: Express.Multer.File,
  body: UploadFileDto,
) => {
  const destination = './files/' + body.folder;
  const fileName =
    new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-') +
    '-' +
    file.originalname.split('.')[0] +
    '.webp';
  mkdirp.sync(destination + '/main');
  mkdirp.sync(destination + '/resized');

  await sharp(file.buffer)
    .webp()
    .toFile(destination + '/main/' + fileName);
  await sharp(file.buffer)
    .webp()
    .resize({ height: body.height || 200, width: body.width || 200 })
    .toFile(destination + '/resized/' + fileName);

  return fileName;
};
export const saveImages = async (
  files: Array<Express.Multer.File>,
  body: UploadFilesDto,
) => {
  const destination = './files/' + body.folder;
  mkdirp.sync(destination + '/main');
  mkdirp.sync(destination + '/resized');

  const fileNames: string[] = [];
  for await (const file of files) {
    const fileName =
      new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-') +
      '-' +
      file.originalname.split('.')[0] +
      '.webp';

    await sharp(file.buffer)
      .webp()
      .toFile(destination + '/main/' + fileName);
    await sharp(file.buffer)
      .webp()
      .resize({ height: body.height || 200, width: body.width || 200 })
      .toFile(destination + '/resized/' + fileName);

    fileNames.push(fileName);
  }

  return fileNames;
};

export const deleteImage = async (fileName: string, folder: string = '') => {

  const imagePath = './files/' + folder;

  try {
    await fs.promises.unlink(`${imagePath}/main/${fileName}`);
    await fs.promises.unlink(`${imagePath}/resized/${fileName}`);
  } catch (error) {
    console.log(error);
  }
};
