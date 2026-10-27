import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dtos/blog.dto';
import { BlogQueryDto } from './dtos/blog-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Blog, Prisma } from '../generated/prisma/client.js';
@Injectable()
export class BlogService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll( queryParams: BlogQueryDto ): Promise<{ blogs: Blog[]; count: number }> {
    const { page = 1, limit = 5, title } = queryParams;
    const where: Prisma.BlogWhereInput = {};
    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }
    const blogs = await this.prismaService.blog.findMany({
      where,
      orderBy: { createdAt: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    });
    const count = await this.prismaService.blog.count({ where });
    return { blogs, count };
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.prismaService.blog.findUnique({
      where: { id: id },
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

  async update(id: string, body: BlogDto): Promise<Blog> {
    return await this.prismaService.blog.update({
      where: { id: id },
      data: body,
    });
  }

  async delete(id: string): Promise<Blog> {
    return await this.prismaService.blog.delete({
      where: {
        id: id,
      },
    });
  }
}
