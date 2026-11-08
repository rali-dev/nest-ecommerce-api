import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../dtos/auth.dto';
import { PasswordPipe } from '../../shared/pipes/password.pipe';
import { UserService } from '../services/user.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-in')
  signin(@Body(new PasswordPipe(false)) body: AuthDto) {
    return this.userService.signin(body);
  }
}
