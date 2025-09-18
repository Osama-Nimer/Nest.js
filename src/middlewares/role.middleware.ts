import { NextFunction, Request, Response } from "express";
import { users } from "../db/schema";
import { db } from '../configs/db.config';
import { eq } from "drizzle-orm";

export const isAuthorizedRole = (...roles: string[]) => {
  // return async (req: Request, res: Response, next: NextFunction) => {
  //   const useId = req.user?.userId;


  //   const  isRole =  await db.select({
  //     role: users.role
  //   })
  //   .from(users)
  //   .where(eq(users.userId, useId!))
  //   .limit(1);
  //   const user = isRole[0];


  //   if (!user || !user.role) {
  //     res.status(400).json({ message: "Bad request: User or role not found" });
  //     return;
  //   }

  //   if (!roles.includes(user.role)) {
  //     res.status(401).json({ message: "Unauthorized" });
  //     return;
  //   }
    
  //   next();
  // };
};