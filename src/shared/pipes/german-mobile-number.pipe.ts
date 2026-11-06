import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserDto } from '../../user/dtos/user.dto';
import { isMobilePhone } from 'class-validator';

@Injectable()
export class GermanMobileNumberPipe implements PipeTransform {
  transform(user: UserDto) {
    if (user?.mobile) {
      if (
        typeof user.mobile !== 'string' ||
        !isMobilePhone(user.mobile, 'de-DE')
      ) {
        throw new BadRequestException(
          'Please enter a valid German mobile number',
        );
      }
    }
    return user;
  }
}
