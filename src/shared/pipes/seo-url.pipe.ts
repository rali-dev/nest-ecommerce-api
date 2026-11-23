import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SeoUrlPipe implements PipeTransform {
  transform(value: any) {
    if (value?.url) {
      const urlPattern = /^[a-z0-9]+(?:[-/][a-z0-9]+)*$/;

      const newUrl = value.url.toLowerCase();
      const isValidUrl = urlPattern.test(newUrl);

      if (!isValidUrl) {
        throw new BadRequestException(
          'The URL is not valid. It may only contain letters, numbers, hyphens and slashes.',
        );
      }
      return { ...value, url: newUrl };
    }
    return value;
  }
}
