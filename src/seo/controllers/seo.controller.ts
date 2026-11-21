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
import { SeoService } from '../services/seo.service';
import { SeoQueryDto } from '../dtos/seo-query.dto';
import { SeoDto } from '../dtos/seo.dto';
import { UrlPipe } from '../../shared/pipes/url.pipe';
import { UpdateSeoDto } from '../dtos/update-seo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../shared/guards/jwt.guard';
import { RoleGuard } from '../../shared/guards/role.guard';
import { Role } from '../../generated/prisma/client';

@ApiTags('Seo')
@Controller('seo')
@UseGuards(JwtGuard, new RoleGuard([Role.ADMIN, Role.COPYWRITER]))
@ApiBearerAuth()
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get()
  findAll(@Query() queryParams: SeoQueryDto) {
    return this.seoService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seoService.findOne(id);
  }

  @Post()
  create(@Body(UrlPipe) body: SeoDto) {
    return this.seoService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(UrlPipe) body: UpdateSeoDto) {
    return this.seoService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.seoService.delete(id);
  }
}
