import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../dtos/auth.dto';
import { PasswordPipe } from '../../shared/pipes/password.pipe';
import { UserService } from '../services/user.service';
import { ConfirmDto } from '../dtos/confirm.dto';
import { ResendDto } from '../dtos/resend.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  // todo: add throttler to sign-in, confirm and resend endpoints
  @Post('sign-in')
  signin(@Body(new PasswordPipe(false)) body: AuthDto) {
    return this.userService.signin(body);
  }

  @Post('confirm')
  confirm(@Body() body: ConfirmDto) {
    return this.userService.confirm(body);
  }

  @Post('resend')
  resend(@Body() body: ResendDto) {
    return this.userService.sendConfirmationCode(body.email);
  }
}
