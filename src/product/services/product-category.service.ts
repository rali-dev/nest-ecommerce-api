import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, ProductCategory } from '../../generated/prisma/client.js';
import { ProductCategoryDto } from '../dtos/product-category.dto';
import { ProductCategoryQueryDto } from '../dtos/product-category-query.dto';
import { UpdateProductCategoryDto } from '../dtos/update-product-category.dto';
import { productCategorySortFunction } from '../../shared/utils/sort-utils';
import { deleteImage } from '../../shared/utils/file-utils';
import { defaultProductCategorySelect } from '../product.select';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    queryParams: ProductCategoryQueryDto,
    select: Prisma.ProductCategorySelect = defaultProductCategorySelect,
  ): Promise<{ productCategories: ProductCategory[]; count: number }> {
    const { limit = 5, page = 1, title, sort, url } = queryParams;

    const where: Prisma.ProductCategoryWhereInput = {};

    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }
    if (url) {
      where.url = { contains: url, mode: 'insensitive' };
    }

    const orderBy = productCategorySortFunction(sort);

    const productCategories = await this.prismaService.productCategory.findMany(
      {
        where,
        orderBy,
        select,
        skip: (page - 1) * limit,
        take: limit,
      },
    );

    const count = await this.prismaService.productCategory.count({ where });

    return { productCategories, count };
  }

  async findOne(
    id: string,
    select: Prisma.ProductCategorySelect = defaultProductCategorySelect,
  ) {
    const productCategory = await this.prismaService.productCategory.findUnique(
      {
        where: { id },
        select,
      },
    );

    if (productCategory) {
      return productCategory;
    } else {
      throw new NotFoundException(`Product category with id ${id} not found`);
    }
  }

  async findOneWithUrl(
    url: string,
    select: Prisma.ProductCategorySelect = defaultProductCategorySelect,
  ) {
    const productCategory = await this.prismaService.productCategory.findUnique(
      {
        where: { url },
        select,
      },
    );

    if (productCategory) {
      return productCategory;
    } else {
      throw new NotFoundException(`Product category with url ${url} not found`);
    }
  }

  async create(body: ProductCategoryDto) {
    return await this.prismaService.productCategory.create({ data: body });
  }

  async update(id: string, body: UpdateProductCategoryDto) {
    const productCategory = await this.findOne(id, { image: true });

    const updatedProductCategory =
      await this.prismaService.productCategory.update({
        where: { id },
        data: body,
      });

    if (body?.image && body.image !== productCategory.image) {
      await deleteImage(productCategory.image, 'product-category');
    }

    return updatedProductCategory;
  }

  async delete(id: string) {
    const productCategory = await this.findOne(id, { image: true });

    const deletedProductCategory =
      await this.prismaService.productCategory.delete({
        where: { id },
      });

    await deleteImage(productCategory.image, 'product-category');

    return deletedProductCategory;
  }
}
