import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from '../../app.service';
import { LogType } from '../../generated/prisma/client.js';

@Catch(HttpException)
export class LogFilter<T extends HttpException> implements ExceptionFilter {
  constructor(private readonly appService: AppService) {}

  async catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const request = host.switchToHttp().getRequest<Request>();

    if (status === 404) {
      response.status(404).send({
        statusCode: status,
        message: 'Die angeforderte Ressource wurde nicht gefunden.',
      });
    } else {
      response.status(status).send(exception.getResponse());
    }

    try {
      await this.appService.log({
        content: JSON.stringify(exception.getResponse()),
        url: request.url,
        type: LogType.ERROR,
      });
    } catch (error) {
      console.error('Could not save log:', error);
    }
  }
}
