import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ReservedUrlPipe implements PipeTransform {
  constructor(private readonly reservedUrls: string[]) {}

  transform(value: any) {
    const url = value?.url?.toLowerCase();
    if (url && this.reservedUrls.includes(url)) {
      throw new BadRequestException(
        `The URL "${url}" is reserved and cannot be used.`,
      );
    }
    return value;
  }
}
