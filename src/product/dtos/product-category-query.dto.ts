import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  GeneralQueryDto,
  ProductCategorySort,
} from '../../shared/dtos/general-query.dto';

export class ProductCategoryQueryDto extends GeneralQueryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(ProductCategorySort)
  sort?: ProductCategorySort;

  @IsOptional()
  @IsString()
  url?: string;
}
