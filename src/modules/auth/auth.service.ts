import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { users } from '../../db/schema';
import { db } from 'src/configs/db.config';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (!user) {
      throw new UnauthorizedException('Invalid      credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, username: user.username };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'defaultSecret',
      { expiresIn: '1h' },
    );

    return { accessToken };
  }

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<{ message: string }> {
    const [existingEmail] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingEmail) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      username,
      email,
      password: hashedPassword,
    });

    return { message: 'User registered successfully' };
  }
}
