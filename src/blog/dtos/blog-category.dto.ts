import { IsString, IsNotEmpty} from 'class-validator';
export class BlogCategoryDto {
  @IsString()
  @IsNotEmpty()
  title : string
  @IsString()
  @IsNotEmpty()
  content: string
}