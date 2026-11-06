import { IsOptional, IsPositive, IsInt } from 'class-validator';

export enum BlogSort {
  Title = 'title',
  UpdatedAt = 'updatedAt',
  CreatedAt = 'createdAt',
}

export enum UserSort {
  LastName = 'lastName',
  UpdatedAt = 'updatedAt',
  CreatedAt = 'createdAt',
}
export class GeneralQueryDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  page?: number;
  
  @IsOptional()
  @IsInt()
  @IsPositive()
  limit?: number;
}
