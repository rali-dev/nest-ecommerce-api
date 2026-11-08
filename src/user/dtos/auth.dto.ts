import { Transform } from 'class-transformer';
import { normalizeEmail } from '../../shared/utils/email-utils';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthDto {
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
}
