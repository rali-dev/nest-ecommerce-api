import { Transform } from 'class-transformer';
import { normalizeEmail } from '../../shared/utils/email-utils';
import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { Role } from '../../generated/prisma/enums';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? normalizeEmail(value) : value,
  )
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
