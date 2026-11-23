import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UrlPipe implements PipeTransform {
  transform(value: any) {
    if (value?.url) {
      const urlPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

      const newUrl = value.url.toLowerCase();
      const validUrl = urlPattern.test(newUrl);

      if (!validUrl) {
        throw new BadRequestException(
          'The URL is not valid. It may only contain letters, numbers, and hyphens.',
        );
      }
      return { ...value, url: newUrl };
    }
    return value;
  }
}
