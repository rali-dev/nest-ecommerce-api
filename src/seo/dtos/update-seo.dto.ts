import { PartialType } from '@nestjs/swagger';
import { SeoDto } from './seo.dto';

export class UpdateSeoDto extends PartialType(SeoDto, {
  skipNullProperties: false,
}) {}
