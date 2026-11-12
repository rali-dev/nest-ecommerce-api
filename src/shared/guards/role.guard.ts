import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role } from '../../generated/prisma/client.js';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly roles: Role[]) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const request = context.switchToHttp().getRequest();
    // console.log(request?.user?.role)

    const request = context.switchToHttp().getRequest<Request>();

    if (this.roles.includes(request['user']?.role)) {
      return true;
    } else {
      return false;
    }
  }
}
