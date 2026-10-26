import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dtos/blog.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Blog } from '../generated/prisma/client.js';
@Injectable()
export class BlogService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Blog[]> {
    return await this.prismaService.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });
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
