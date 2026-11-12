import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserQueryDto } from '../dtos/user-query.dto';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { NamePipe } from '../../shared/pipes/name.pipe';
import { GermanMobileNumberPipe } from '../../shared/pipes/german-mobile-number.pipe';
import { PasswordPipe } from '../../shared/pipes/password.pipe';
import { PasswordInterceptor } from '../../shared/interceptors/password.interceptor';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../../shared/guards/jwt.guard';
import { RoleGuard } from '../../shared/guards/role.guard';
import { Role } from '../../generated/prisma/client.js';

@Controller('user')
@UseGuards(JwtGuard, new RoleGuard([Role.ADMIN]))
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() queryParams: UserQueryDto) {
    return this.userService.findAll(queryParams);
  }

  @UseInterceptors(PasswordInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @UseInterceptors(PasswordInterceptor)
  create(
    @Body(NamePipe, GermanMobileNumberPipe, new PasswordPipe(true))
    body: UserDto,
  ) {
    return this.userService.create(body);
  }

  @Patch(':id')
  @UseInterceptors(PasswordInterceptor)
  update(
    @Param('id') id: string,
    @Body(NamePipe, GermanMobileNumberPipe, new PasswordPipe(true))
    body: UpdateUserDto,
  ) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @UseInterceptors(PasswordInterceptor)
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
