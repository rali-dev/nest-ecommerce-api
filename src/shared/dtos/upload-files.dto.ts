import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';
export class UploadFilesDto {
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  @Allow()
  files: Express.Multer.File[];

  @IsOptional()
  folder?: string;

  @IsOptional()
  height?: number;

  @IsOptional()
  width?: number;
}
