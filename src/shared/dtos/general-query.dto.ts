import { IsOptional, IsNumber, IsString, IsPositive, IsEnum } from 'class-validator';

export enum Sort {
  Title = 'title',
  UpdatedAt = 'updatedAt',
  CreatedAt = 'createdAt',
}
export class GeneralQueryDto {
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
  @IsOptional()
  @IsEnum(Sort)
  sort?: Sort
}
