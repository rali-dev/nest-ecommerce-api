import { IsString, IsNotEmpty } from 'class-validator';

export class BlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
