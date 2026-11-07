import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserQueryDto } from '../dtos/user-query.dto';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { NamePipe } from '../../shared/pipes/name.pipe';
import { GermanMobileNumberPipe } from '../../shared/pipes/german-mobile-number.pipe';
import { PasswordPipe } from '../../shared/pipes/password.pipe';
import { PasswordInterceptor } from '../../shared/interceptors/password.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() queryParams: UserQueryDto) {
    return this.userService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @UseInterceptors(PasswordInterceptor)
  create(@Body(NamePipe, GermanMobileNumberPipe, PasswordPipe) body: UserDto) {
    return this.userService.create(body);
  }

  @Put(':id')
  @UseInterceptors(PasswordInterceptor)
  update(
    @Param('id') id: string,
    @Body(NamePipe, GermanMobileNumberPipe, PasswordPipe) body: UserDto,
  ) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
