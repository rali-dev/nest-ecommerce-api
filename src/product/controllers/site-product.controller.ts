import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import {
  publicProductCategoryDetailSelect,
  publicProductCategorySelect,
  publicProductDetailSelect,
  publicProductSelect,
} from '../product.select';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductQueryDto } from '../dtos/product-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductCategoryQueryDto } from '../dtos/product-category-query.dto';

@ApiTags('Public Product')
@Controller('site/product')
export class SiteProductController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
    private readonly productService: ProductService,
  ) {}

  @Get('categories')
  findCategories(@Query() queryParams: ProductCategoryQueryDto) {
    return this.productCategoryService.findAll(
      queryParams,
      publicProductCategorySelect,
    );
  }

  @Get('category/:url')
  async findCategory(
    @Param('url') url: string,
    @Query() queryParams: ProductQueryDto,
  ) {
    const category = await this.productCategoryService.findOneWithUrl(
      url,
      publicProductCategoryDetailSelect,
    );

    const { products, count } = await this.productService.findAll(
      { ...queryParams, categoryId: category.id },
      publicProductSelect,
    );
    return { category, products, count };
  }

  @Get(':url')
  async findProduct(@Param('url') url: string) {
    const product = await this.productService.findOneWithUrl(
      url,
      publicProductDetailSelect,
    );

    const relatedProducts = await this.productService.findAll(
      {
        categoryId: product.categoryId,
        exclude: [product.id],
      },
      publicProductSelect,
    );
    return { product, relatedProducts };
  }
}
