import { Module } from '@nestjs/common';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';
import { BlogCategoryController } from './controllers/blog-category.controller';
import { BlogCategoryService } from './services/blog-category.service';

@Module({
  controllers: [BlogController, BlogCategoryController],
  providers: [BlogService, BlogCategoryService],
})
export class BlogModule {}
