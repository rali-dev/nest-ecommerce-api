import { Module } from '@nestjs/common';
import { SeoController } from './controllers/seo.controller';
import { SeoService } from './services/seo.service';
import { SiteSeoController } from './controllers/site-seo.controller';

@Module({
  controllers: [SeoController, SiteSeoController],
  providers: [SeoService],
})
export class SeoModule {}
