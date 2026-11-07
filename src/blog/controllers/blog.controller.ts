import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { BlogDto } from '../dtos/blog.dto';
import { BlogQueryDto } from '../dtos/blog-query.dto';
import { BlogService } from '../services/blog.service';
import { UpdateBlogDto } from '../dtos/update-blog.dto';

// @ApiHeader({
//   name: 'apikey',
//   description: 'API KEY',
// })
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll(@Query() queryParams: BlogQueryDto) {
    return this.blogService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Post()
  create(@Body() body: BlogDto) {
    return this.blogService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateBlogDto) {
    return this.blogService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
