import { UserDto } from './user.dto';
import { OmitType } from '@nestjs/swagger';

export class SignUpDto extends OmitType(UserDto, ['role'] as const) {}
