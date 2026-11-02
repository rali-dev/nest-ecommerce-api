import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';
export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  @Allow()
  file: Express.Multer.File;

  @IsOptional()
  folder?: string;

  @IsOptional()
  height?: number;

  @IsOptional()
  width?: number;
}
