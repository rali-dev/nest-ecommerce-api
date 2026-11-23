import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Product } from '../../generated/prisma/client.js';
import { ProductDto } from '../dtos/product.dto';
import { ProductQueryDto } from '../dtos/product-query.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { productSortFunction } from '../../shared/utils/sort-utils';
import { deleteImage } from '../../shared/utils/file-utils';
import { defaultProductSelect } from '../product.select';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    queryParams: ProductQueryDto,
    select: Prisma.ProductSelect = defaultProductSelect,
  ): Promise<{ products: Product[]; count: number }> {
    const {
      limit = 5,
      page = 1,
      title,
      sort,
      categoryId,
      url,
      exclude,
    } = queryParams;

    const where: Prisma.ProductWhereInput = {};

    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }
    if (url) {
      where.url = { contains: url, mode: 'insensitive' };
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }
    if (exclude?.length) {
      where.id = { notIn: exclude };
    }

    const orderBy = productSortFunction(sort);

    const products = await this.prismaService.product.findMany({
      where,
      orderBy,
      select: {
        ...select,
        category: {
          select: { id: true, title: true },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const count = await this.prismaService.product.count({ where });

    return { products, count };
  }

  async findOne(
    id: string,
    select: Prisma.ProductSelect = defaultProductSelect,
  ): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      select: {
        ...select,
        category: {
          select: { id: true, title: true },
        },
      },
    });

    if (product) {
      return product;
    } else {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }

  async findOneWithUrl(
    url: string,
    select: Prisma.ProductSelect = defaultProductSelect,
  ): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: { url },
      select: {
        ...select,
        category: {
          select: { id: true, title: true },
        },
      },
    });

    if (product) {
      return product;
    } else {
      throw new NotFoundException(`Product with url ${url} not found`);
    }
  }

  async create(body: ProductDto): Promise<Product> {
    return await this.prismaService.product.create({ data: body });
  }

  async update(id: string, body: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id, { images: true, thumbnail: true });

    const updatedProduct = await this.prismaService.product.update({
      where: { id },
      data: body,
    });

    const oldFiles = new Set([...product.images, product.thumbnail]);
    const newFiles = [...updatedProduct.images, updatedProduct.thumbnail];

    for (const file of oldFiles) {
      if (!newFiles.includes(file)) {
        await deleteImage(file, 'product');
      }
    }

    return updatedProduct;
  }

  async delete(id: string): Promise<Product> {
    const product = await this.findOne(id, { images: true, thumbnail: true });

    const deletedProduct = await this.prismaService.product.delete({
      where: { id },
    });

    for (const image of product.images) {
      await deleteImage(image, 'product');
    }

    if (!product.images.includes(product.thumbnail)) {
      await deleteImage(product.thumbnail, 'product');
    }

    return deletedProduct;
  }
}
