import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
@Injectable()
export class IdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);

    if (metadata.type === 'param' && metadata.data === 'id') {
      if (typeof value !== 'string' || !isUUID(value, 4)) {
        throw new BadRequestException('The ID must be a valid UUID');
      }
      return value;
    }
    return value;
  }
}
