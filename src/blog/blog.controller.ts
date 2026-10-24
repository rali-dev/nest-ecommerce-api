import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { BlogDto } from './dtos/blog.dto';

@Controller('blog')
export class BlogController {
  @Get()
  findAll(@Query() queryParams) {
    return 'find all';
  }

  @Get('category')
  findAllCategories() {
    return 'all categories';
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(id);
    return 'return one';
  }

  @Post()
  create(@Body() body: BlogDto) {
    return 'created';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('id') body: BlogDto) {
    console.log(body);
    console.log(id);
    return 'updated';
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    console.log(id);
    return 'deleted';
  }
}
