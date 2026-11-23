import { Controller, Get, Query } from '@nestjs/common';
import { SeoService } from '../services/seo.service';
import { ApiTags } from '@nestjs/swagger';
import { SiteSeoQueryDto } from '../dtos/site-seo-query.dto';
import { SeoUrlPipe } from '../../shared/pipes/seo-url.pipe';

@ApiTags('Site Seo')
@Controller('site-seo')
export class SiteSeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get()
  getSeoItem(@Query(SeoUrlPipe) queryParams: SiteSeoQueryDto) {
    return this.seoService.findOneWithUrl(queryParams.url);
  }
}
