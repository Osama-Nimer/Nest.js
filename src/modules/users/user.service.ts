import { users } from 'src/db/schema';
import { db } from 'src/configs/db.config';
import { eq } from 'drizzle-orm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
    async findById(id: number) {
        const usersList = await db
          .select()
          .from(users)
          .where(eq(users.id, id))
          .limit(1);
      
        const user = usersList[0];
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      }
      

  async findAll() {
    try {
      const usersList = await db.select().from(users);

      if (!usersList || usersList.length === 0) {
        throw new NotFoundException('No users found');
      }
      return usersList;
    } catch (error: any) {
      throw new NotFoundException('Users not found' + error.message);
    }
  }
}
