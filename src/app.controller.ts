import {
  Controller,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { UploadFileDto } from './shared/dtos/upload-file.dto';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { saveImage } from './shared/utils/file-utils';
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
    return saveImage(file, body)
  }
}
