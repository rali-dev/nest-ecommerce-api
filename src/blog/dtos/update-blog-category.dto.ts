import { PartialType } from '@nestjs/swagger';
import { BlogCategoryDto } from './blog-category.dto';

export class UpdateBlogCategoryDto extends PartialType(BlogCategoryDto, {
  skipNullProperties: false,
}) {}
