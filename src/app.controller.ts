import {
  Controller,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Delete,
} from '@nestjs/common';
import { UploadFileDto } from './shared/dtos/upload-file.dto';
import { UploadFilesDto } from './shared/dtos/upload-files.dto';
import { DeleteFileDto } from './shared/dtos/delete-file.dto';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { saveImage, saveImages, deleteImage } from './shared/utils/file-utils';
import { ImagesPipe } from './shared/pipes/images.pipe';

@ApiTags('Shared')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload-file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 20000000 }),
          new FileTypeValidator({
            fileType: /(image\/jpeg|image\/png|image\/jpg|image\/webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: UploadFileDto,
  ) {
    return saveImage(file, body);
  }

  @Post('upload-files')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFilesDto })
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @UploadedFiles(ImagesPipe) files: Array<Express.Multer.File>,
    @Body() body: UploadFilesDto,
  ) {
    return saveImages(files, body);
  }

  @Delete('delete-file')
  deleteFile(@Body() body: DeleteFileDto) {
    return deleteImage(body.fileName, body.folder);
  }
}
