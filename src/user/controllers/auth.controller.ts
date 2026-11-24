import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../dtos/auth.dto';
import { PasswordPipe } from '../../shared/pipes/password.pipe';
import { UserService } from '../services/user.service';
import { ConfirmDto } from '../dtos/confirm.dto';
import { ResendDto } from '../dtos/resend.dto';
import { Throttle } from '@nestjs/throttler';
import { SignUpDto } from '../dtos/signup.dto';
import { Role } from '../../generated/prisma/enums';
import { NamePipe } from '../../shared/pipes/name.pipe';
import { GermanMobileNumberPipe } from '../../shared/pipes/german-mobile-number.pipe';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('sign-in')
  signin(@Body(new PasswordPipe(false)) body: AuthDto) {
    return this.userService.signin(body);
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('confirm')
  confirm(@Body() body: ConfirmDto) {
    return this.userService.confirm(body);
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('resend')
  resend(@Body() body: ResendDto) {
    return this.userService.sendConfirmationCode(body.email);
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('sign-up')
  async signup(
    @Body(NamePipe, GermanMobileNumberPipe, new PasswordPipe(true))
    body: SignUpDto,
  ) {
    const user = await this.userService.create({ ...body, role: Role.USER });
    if (user?.id) {
      return this.userService.sendConfirmationCode(user.email);
    }
  }
}
