import jwt from "jsonwebtoken";
import { db } from '../configs/db.config'; 
import { users } from "../db/schema";
import { eq } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || "NextStepUltraSecret";
export const createToken = (userId: string): string => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });
  return token;
};


export const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown;
    
    if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded && 'username' in decoded) {
      const { sub, username } = decoded as { sub: number; username: string };
    } else {
      throw new Error("Invalid token structure");
    }

    const userId = decoded.sub as number;

    const usersList = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    const user = usersList[0];
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

  
