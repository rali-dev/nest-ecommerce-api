import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SeoQueryDto } from '../dtos/seo-query.dto';
import { Prisma } from '../../generated/prisma/client';
import { defaultSeoSelect, publicSeoSelect } from '../seo.select';
import { SeoDto } from '../dtos/seo.dto';
import { UpdateSeoDto } from '../dtos/update-seo.dto';

@Injectable()
export class SeoService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    queryParams: SeoQueryDto,
    select: Prisma.SeoSelect = defaultSeoSelect,
  ) {
    const { page = 1, limit = 10, url } = queryParams;
    const where: Prisma.SeoWhereInput = {};
    if (url) {
      where.url = { contains: url, mode: 'insensitive' };
    }

    const seos = await this.prismaService.seo.findMany({
      where,
      select,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const count = await this.prismaService.seo.count({ where });

    return { seos, count };
  }

  async findOne(id: string, select: Prisma.SeoSelect = defaultSeoSelect) {
    const seo = await this.prismaService.seo.findUnique({
      where: { id: id },
      select,
    });

    if (seo) {
      return seo;
    } else {
      throw new NotFoundException(`Seo with id ${id} not found`);
    }
  }

  async findOneWithUrl(
    url: string,
    select: Prisma.SeoSelect = publicSeoSelect,
  ) {
    const seo = await this.prismaService.seo.findUnique({
      where: { url: url },
      select,
    });

    if (seo) {
      return seo;
    } else {
      throw new NotFoundException(`Seo with url ${url} not found`);
    }
  }

  async create(body: SeoDto, select: Prisma.SeoSelect = defaultSeoSelect) {
    return await this.prismaService.seo.create({
      data: body,
      select,
    });
  }

  async update(
    id: string,
    body: UpdateSeoDto,
    select: Prisma.SeoSelect = defaultSeoSelect,
  ) {
    await this.findOne(id, { id: true });
    return await this.prismaService.seo.update({
      where: { id: id },
      data: body,
      select,
    });
  }

  async delete(id: string, select: Prisma.SeoSelect = defaultSeoSelect) {
    await this.findOne(id, { id: true });
    return this.prismaService.seo.delete({
      where: { id: id },
      select,
    });
  }
}
