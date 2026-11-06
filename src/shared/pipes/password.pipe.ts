import {
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UserDto } from '../../user/dtos/user.dto';

@Injectable()
export class PasswordPipe implements PipeTransform {
  transform(user: UserDto) {
    if (user?.password) {
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/;

      const isValidPassword = passwordPattern.test(user?.password);
      if (!isValidPassword) {
        throw new BadRequestException(
          'Password must be at least 8 characters long and include an uppercase English letter, a lowercase English letter, a number, and a special character. Whitespace is not allowed.',
        );
      }
    }
    return user;
  }
}
