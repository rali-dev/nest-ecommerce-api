import { IsOptional, IsNumber, IsString, IsPositive } from 'class-validator';
export class BlogQueryDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  page?: number;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit?: number;
  @IsOptional()
  @IsString()
  title?: string;
}
