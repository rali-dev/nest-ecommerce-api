import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from '../../app.service';
import { LogType } from '../../generated/prisma/client.js';

@Catch(HttpException)
export class LogFilter<T extends HttpException> implements ExceptionFilter {
  constructor(private readonly appService: AppService) {}

  async catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();

    if (status === 404) {
      response.status(404).send({
        statusCode: status,
        message: 'Die angeforderte Ressource wurde nicht gefunden.',
      });
    } else {
      response.send(exception.getResponse());
    }

    try {
      await this.appService.log({
        type: LogType.Error,
        content: JSON.stringify(exception.getResponse()),
      });
    } catch (error) {
      console.error('Could not save log:', error);
    }
    console.log(exception);
  }
}
