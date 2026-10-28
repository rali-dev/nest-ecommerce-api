import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import { BlogCategoryService } from '../services/blog-category.service';
import { BlogCategoryDto } from '../dtos/blog-category.dto';
import { BlogCategoryQueryDto } from '../dtos/blog-category-query.dto';
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

  @Put(':id')
  update(@Param('id') id: string, @Body() body: BlogCategoryDto) {
    return this.blogCategoryService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogCategoryService.delete(id);
  }
}
