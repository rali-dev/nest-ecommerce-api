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
import { ProductDto } from '../dtos/product.dto';
import { ProductService } from '../services/product.service';
import { ProductQueryDto } from '../dtos/product-query.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { JwtGuard } from '../../shared/guards/jwt.guard';
import { RoleGuard } from '../../shared/guards/role.guard';
import { Role } from '../../generated/prisma/client';
import { UrlPipe } from '../../shared/pipes/url.pipe';
import { BodyIdPipe } from '../../shared/pipes/body-id.pipe';

@ApiTags('Product')
@Controller('product')
@UseGuards(JwtGuard, new RoleGuard([Role.ADMIN, Role.COPYWRITER]))
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  findAll(@Query() queryParams: ProductQueryDto) {
    return this.productService.findAll(queryParams);
  }

  @Post()
  create(@Body(UrlPipe, new BodyIdPipe(['categoryId'])) body: ProductDto) {
    return this.productService.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(UrlPipe, new BodyIdPipe(['categoryId'])) body: UpdateProductDto,
  ) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
