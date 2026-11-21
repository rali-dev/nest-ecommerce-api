import { IsOptional, IsString } from 'class-validator';
import { GeneralQueryDto } from '../../shared/dtos/general-query.dto';

export class SeoQueryDto extends GeneralQueryDto {
  @IsString()
  @IsOptional()
  url?: string;
}
