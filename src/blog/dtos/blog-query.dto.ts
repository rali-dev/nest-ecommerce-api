import { BlogSort, GeneralQueryDto } from '../../shared/dtos/general-query.dto';
import { IsString, IsOptional, IsEnum } from 'class-validator';
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
}
