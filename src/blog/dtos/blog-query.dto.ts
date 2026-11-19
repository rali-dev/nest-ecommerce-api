import { Transform } from 'class-transformer';
import { BlogSort, GeneralQueryDto } from '../../shared/dtos/general-query.dto';
import { IsString, IsOptional, IsEnum, IsArray, IsUUID } from 'class-validator';
export class BlogQueryDto extends GeneralQueryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(BlogSort)
  sort?: BlogSort;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsString({ each: true })
  exclude?: string[];
}
