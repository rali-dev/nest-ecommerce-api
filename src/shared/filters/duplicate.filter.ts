import { ArgumentsHost, Catch } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class DuplicateFilter extends BaseExceptionFilter {
  constructor(adapterHost: HttpAdapterHost) {
    super(adapterHost.httpAdapter);
  }
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    if (exception.code === 'P2002') {

      console.dir(exception.meta, {depth:null});
      const response = host.switchToHttp().getResponse<Response>();
      const driverError = exception.meta?.driverAdapterError;

      const cause =
        typeof driverError === 'object' &&
        driverError !== null &&
        'cause' in driverError
          ? driverError.cause
          : undefined;

      const constraint =
        typeof cause === 'object' && cause !== null && 'constraint' in cause
          ? cause.constraint
          : undefined;

      const index =
        typeof constraint === 'object' &&
        constraint !== null &&
        'index' in constraint
          ? constraint.index
          : undefined;

      const duplicatedField =
        exception.meta?.modelName === 'User' && index === 'User_email_key'
          ? 'email'
          : undefined;

      response.status(409).json({
        statusCode: 409,
        message: duplicatedField
          ? `${duplicatedField} already exists`
          : 'A record with this value already exists',
      });
      return;
    }

    super.catch(exception, host);
  }
}
