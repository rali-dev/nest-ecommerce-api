import { Module } from '@nestjs/common';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';
import { BlogCategoryController } from './controllers/blog-category.controller';
import { BlogCategoryService } from './services/blog-category.service';
import { SiteBlogController } from './controllers/site-blog.controller';

@Module({
  controllers: [BlogController, BlogCategoryController, SiteBlogController],
  providers: [BlogService, BlogCategoryService],
})
export class BlogModule {}
