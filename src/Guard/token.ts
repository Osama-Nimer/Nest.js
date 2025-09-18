import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { verifyToken } from 'src/middlewares/Token';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new UnauthorizedException('Token not found');

    try {
      const user = await verifyToken(token);
      req.user = user; // حط الـ user عشان نستعمله بالـ decorator
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
