import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductCategoryService } from './services/product-category.service';
import { ProductCategoryController } from './controllers/product-category.controller';
import { SiteProductController } from './controllers/site-product.controller';

@Module({
  controllers: [
    ProductController,
    ProductCategoryController,
    SiteProductController,
  ],
  providers: [ProductService, ProductCategoryService],
  imports: [],
})
export class ProductModule {}
