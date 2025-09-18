import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { InferSelectModel } from 'drizzle-orm';
import { users } from '../db/schema';

type User = InferSelectModel<typeof users>;

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User | undefined => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const GetUserId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return data ? req.user?.[data] : req.user; 
  },
);

