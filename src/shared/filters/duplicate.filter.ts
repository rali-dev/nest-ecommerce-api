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
      console.dir(exception.meta, { depth: null });
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

      const DUPLICATE_FIELDS: Record<string, string> = {
        User_email_key: 'email',
        Blog_url_key: 'url',
        BlogCategory_url_key: 'url',
        Seo_url_key: 'url',
        Product_url_key: 'url',
        ProductCategory_url_key: 'url',
      };

      const duplicatedField =
        typeof index === 'string' ? DUPLICATE_FIELDS[index] : undefined;

      response.status(409).json({
        statusCode: 409,
        message: duplicatedField
          ? `${duplicatedField} already exists`
          : 'A record with this value already exists',
      });
      return;
    }

    if (exception.code === 'P2003') {
      const response = host.switchToHttp().getResponse<Response>();

      response.status(409).json({
        statusCode: 409,
        message: 'The related record does not exist or is still in use',
      });
      return;
    }

    super.catch(exception, host);
  }
}
