import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserDto } from '../../user/dtos/user.dto';

@Injectable()
export class NamePipe implements PipeTransform {
  transform(user: UserDto) {
    const items = ['firstName', 'lastName'];
    const errors: string[] = [];

    const namePattern = /^[A-Za-zÄÖÜäöüß]+(?:[ '-][A-Za-zÄÖÜäöüß]+)*$/;

    for (const key in user) {
      if (items.includes(key)) {
        const isValidName = namePattern.test(user[key]);
        if (!isValidName) {
          errors.push(`${key} contains invalid characters`);
        }
      }
    }

    if (errors.length) {
      throw new BadRequestException(errors);
    }
    return user;
  }
}
