import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { LogDto } from './shared/dtos/log.dto';
@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async log(body: LogDto) {
    const newLog = this.prismaService.log.create({
      data: body,
    });

    return newLog;
  }
}
