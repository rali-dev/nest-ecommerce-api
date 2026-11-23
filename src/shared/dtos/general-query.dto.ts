import { IsOptional, IsPositive, IsInt, Max } from 'class-validator';

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

export enum ProductSort {
  Title = 'title',
  Cheap = 'cheap',
  Expensive = 'expensive',
  UpdatedAt = 'updatedAt',
  CreatedAt = 'createdAt',
}

export enum ProductCategorySort {
  Title = 'title',
  UpdatedAt = 'updatedAt',
  CreatedAt = 'createdAt',
}

export class GeneralQueryDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Max(100000)
  page?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Max(100)
  limit?: number;
}
