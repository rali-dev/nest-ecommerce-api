import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { LogType } from '../../generated/prisma/client.js';

export class LogDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsEnum(LogType)
  type: LogType;
}
