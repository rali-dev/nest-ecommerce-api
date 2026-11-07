import {
  Controller,
  Get,
  Delete,
  Post,
  Query,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { BlogCategoryService } from '../services/blog-category.service';
import { BlogCategoryDto } from '../dtos/blog-category.dto';
import { BlogCategoryQueryDto } from '../dtos/blog-category-query.dto';
import { UpdateBlogCategoryDto } from '../dtos/update-blog-category.dto';
@Controller('blog-category')
export class BlogCategoryController {
  constructor(private readonly blogCategoryService: BlogCategoryService) {}
  @Get()
  findAll(@Query() queryParams: BlogCategoryQueryDto) {
    return this.blogCategoryService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogCategoryService.findOne(id);
  }

  @Post()
  async create(@Body() body: BlogCategoryDto) {
    return this.blogCategoryService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateBlogCategoryDto) {
    return this.blogCategoryService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogCategoryService.delete(id);
  }
}
