import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class LogFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
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
    console.log(exception);
  }
}
