import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SeoDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  seoTitle: string;

  @IsString()
  @IsNotEmpty()
  seoDescription: string;

  @IsString()
  @IsOptional()
  h1?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
