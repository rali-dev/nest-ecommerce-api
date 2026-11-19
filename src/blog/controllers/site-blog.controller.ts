import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlogCategoryService } from '../services/blog-category.service';
import { publicBlogCategorySelect, publicBlogSelect } from '../blog.select';
import { ApiTags } from '@nestjs/swagger';
import { BlogCategoryQueryDto } from '../dtos/blog-category-query.dto';
import { BlogService } from '../services/blog.service';
import { BlogQueryDto } from '../dtos/blog-query.dto';

@ApiTags('Public Blog')
@Controller('site/blog')
export class SiteBlogController {
  constructor(
    private readonly blogCategoryService: BlogCategoryService,
    private readonly blogService: BlogService,
  ) {}

  @Get('categories')
  findCategories(@Query() queryParams: BlogCategoryQueryDto) {
    return this.blogCategoryService.findAll(
      queryParams,
      publicBlogCategorySelect,
    );
  }

  @Get('category/:url')
  async findCategory(
    @Param('url') url: string,
    @Query() queryParams: BlogQueryDto,
  ) {
    const category = await this.blogCategoryService.findOneWithUrl(url);

    const { blogs, count } = await this.blogService.findAll(
      { ...queryParams, categoryId: category.id },
      publicBlogSelect,
    );
    return { category, blogs, count };
  }

  @Get(':url')
  async findBlog(@Param('url') url: string) {
    const blog = await this.blogService.findOneWithUrl(url);

    const relatedBlogs = await this.blogService.findAll(
      {
        categoryId: blog.categoryId,
        exclude: [blog.id],
      },
      publicBlogSelect,
    );

    return { blog, relatedBlogs };
  }
}
