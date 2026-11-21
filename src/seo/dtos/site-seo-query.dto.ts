import { IsNotEmpty, IsString } from 'class-validator';

export class SiteSeoQueryDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}
