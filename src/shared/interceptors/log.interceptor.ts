import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';
import { AppService } from '../../app.service';
import { LogType } from '../../generated/prisma/client.js';
@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly appService: AppService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      tap(async (response) => {
        const type = LogType[request.method];
        if (!type) {
          return;
        }

        try {
          await this.appService.log({
            content:
              response === undefined
                ? 'No response body'
                : JSON.stringify(response),
            url: request.url,
            type,
            userId: request['user']?.id || null,
          });
        } catch (error) {
          console.error('Could not save log:', error);
        }
      }),
    );
  }
}
