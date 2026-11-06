import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BlogSort, GeneralQueryDto } from '../../shared/dtos/general-query.dto';
export class BlogCategoryQueryDto extends GeneralQueryDto {
  @IsOptional()
  @IsString()
  title?: string;
  
  @IsOptional()
  @IsEnum(BlogSort)
  sort?: BlogSort;
}
