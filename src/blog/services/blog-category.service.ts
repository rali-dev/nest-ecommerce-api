import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BlogCategoryQueryDto } from '../dtos/blog-category-query.dto';
import { sortFunction } from '../../shared/utils/sort-utils';
import { Prisma, BlogCategory } from '../../generated/prisma/client.js';
import { defaultBlogCategorySelect } from '../blog.select';
import { BlogCategoryDto } from '../dtos/blog-category.dto';
@Injectable()
export class BlogCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    queryParams: BlogCategoryQueryDto,
    select: Prisma.BlogCategorySelect = defaultBlogCategorySelect,
  ): Promise<{ blogCategories: BlogCategory[]; count: number }> {
    const { page = 1, limit = 5, title, sort } = queryParams;

    const where: Prisma.BlogCategoryWhereInput = {};

    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }

    const orderBy = sortFunction(sort);

    const blogCategories = await this.prismaService.blogCategory.findMany({
      where: where,
      orderBy: orderBy,
      select: select,
      skip: (page - 1) * limit,
      take: limit,
    });

    const count = await this.prismaService.blogCategory.count({ where });

    return { blogCategories, count };
  }

  async findOne(
    id: string,
    select: Prisma.BlogCategorySelect = defaultBlogCategorySelect,
  ) {
    const blogCategory = await this.prismaService.blogCategory.findUnique({
      where: { id: id },
      select: select,
    });

    if (blogCategory) {
      return blogCategory;
    } else {
      throw new NotFoundException(`Blog category with id ${id} not found`);
    }
  }

  async create(body: BlogCategoryDto) {
    return await this.prismaService.blogCategory.create({ data: body });
  }

  async update(id: string, body: BlogCategoryDto) {
    return await this.prismaService.blogCategory.update({
      where: { id: id },
      data: body,
      select: { title: true, content: true },
    });
  }

  async delete(id: string) {
    return await this.prismaService.blogCategory.delete({
      where: { id: id },
      select: { id: true },
    });
  }
}
