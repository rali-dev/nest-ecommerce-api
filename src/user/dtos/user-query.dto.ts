import { IsEnum, IsOptional, IsString } from 'class-validator';
import { GeneralQueryDto, UserSort } from '../../shared/dtos/general-query.dto';

export class UserQueryDto extends GeneralQueryDto {
  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  mobile?: string;
  
  @IsOptional()
  @IsEnum(UserSort)
  sort?: UserSort;
}
