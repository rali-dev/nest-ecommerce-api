import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dtos/blog.dto';
import { BlogQueryDto } from './dtos/blog-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Blog, Prisma } from '../generated/prisma/client.js';
import { sortFunction } from '../shared/utils/sort-utils';
import { defaultBlogSelect } from './blog.select';
@Injectable()
export class BlogService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    queryParams: BlogQueryDto,
    select: Prisma.BlogSelect = defaultBlogSelect,
  ): Promise<{ blogs: Blog[]; count: number }> {
    const { page = 1, limit = 5, title, sort } = queryParams;

    const where: Prisma.BlogWhereInput = {};
    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }

    const orderBy = sortFunction(sort);

    const blogs = await this.prismaService.blog.findMany({
      where,
      orderBy: orderBy,
      select,
      skip: (page - 1) * limit,
      take: limit,
    });
    const count = await this.prismaService.blog.count({ where });
    return { blogs, count };
  }

  async findOne(
    id: string,
    select: Prisma.BlogSelect = defaultBlogSelect,
  ): Promise<Blog> {
    const blog = await this.prismaService.blog.findUnique({
      where: { id: id },
      select,
    });

    if (blog) {
      return blog;
    } else {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
  }

  async create(body: BlogDto): Promise<Blog> {
    return await this.prismaService.blog.create({ data: body });
  }

  async update(id: string, body: BlogDto) {
    return await this.prismaService.blog.update({
      where: { id: id },
      data: body,
      select: { title: true, content: true },
    });
  }

  async delete(id: string) {
    return await this.prismaService.blog.delete({
      where: { id: id },
      select: { id: true },
    });
  }
}
