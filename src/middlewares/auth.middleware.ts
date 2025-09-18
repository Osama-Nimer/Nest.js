// middlewares/auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from './Token';
import { InferSelectModel } from 'drizzle-orm';
import { users } from '../db/schema';

type User = InferSelectModel<typeof users>;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Please login again' });
    }
  }
}
