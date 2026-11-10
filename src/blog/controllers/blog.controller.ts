import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Delete,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { BlogDto } from '../dtos/blog.dto';
import { BlogQueryDto } from '../dtos/blog-query.dto';
import { BlogService } from '../services/blog.service';
import { UpdateBlogDto } from '../dtos/update-blog.dto';
import { JwtGuard } from '../../shared/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserId } from '../../shared/decorators/user.decorator';

// @ApiHeader({
//   name: 'apikey',
//   description: 'API KEY',
// })
@Controller('blog')
@UseGuards(JwtGuard)
@ApiBearerAuth()
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
  create(@Body() body: BlogDto, @UserId() userId: string) {
    return this.blogService.create(body, userId);
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
