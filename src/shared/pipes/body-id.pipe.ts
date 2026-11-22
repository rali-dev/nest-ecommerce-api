import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class BodyIdPipe implements PipeTransform {
  constructor(private readonly items: string[]) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const errorItems: string[] = [];

    for (const item of this.items) {
      const id = value?.[item];
      if (id && !isUUID(id, 4)) {
        errorItems.push(item);
      }
    }

    if (errorItems.length) {
      throw new BadRequestException(
        `Invalid ID format for: ${errorItems.join(', ')}`,
      );
    }
    return value;
  }
}
