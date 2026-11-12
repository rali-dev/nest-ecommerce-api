import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request?.headers?.authorization?.split(' ')[1];

    if (!accessToken) {
      return false;
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken);

      request['user'] = {
        id: payload?.sub,
        role: payload?.role,
      };

      return true;
    } catch (error) {
      return false;
    }
  }
}
