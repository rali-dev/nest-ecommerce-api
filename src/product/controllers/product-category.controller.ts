import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductCategoryDto } from '../dtos/product-category.dto';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategoryQueryDto } from '../dtos/product-category-query.dto';
import { UpdateProductCategoryDto } from '../dtos/update-product-category.dto';
import { JwtGuard } from '../../shared/guards/jwt.guard';
import { RoleGuard } from '../../shared/guards/role.guard';
import { Role } from '../../generated/prisma/client';
import { UrlPipe } from '../../shared/pipes/url.pipe';

@ApiTags('ProductCategory')
@Controller('product-category')
@UseGuards(JwtGuard, new RoleGuard([Role.ADMIN, Role.COPYWRITER]))
@ApiBearerAuth()
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}
  @Get()
  findAll(@Query() queryParams: ProductCategoryQueryDto) {
    return this.productCategoryService.findAll(queryParams);
  }

  @Post()
  create(@Body(UrlPipe) body: ProductCategoryDto) {
    return this.productCategoryService.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(UrlPipe) body: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productCategoryService.delete(id);
  }
}
