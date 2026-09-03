import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'passwordHash'>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.passwordHash) {
      const isMatch = await bcrypt.compare(pass, user.passwordHash);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...result } = user;
        return result;
        // dsfsdfds
      }
    }
    return null;
  }

  login(user: UserWithoutPassword) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(data: Prisma.UserCreateInput): Promise<UserWithoutPassword> {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }
    if (!data.passwordHash) {
      throw new UnauthorizedException('Password is required');
    }
    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(data.passwordHash, saltOrRounds);

    const user = await this.usersService.create({
      ...data,
      passwordHash,
      statuses: {
        create: [
          {
            name: 'To Pay',
            slug: 'to-pay',
            color: '#f59e0b', // amber/orange
            sortOrder: 0,
          },
          {
            name: 'PAID',
            slug: 'paid',
            color: '#22c55e', // green
            sortOrder: 1,
          },
        ],
      },
      categories: {
        create: [
          {
            name: 'Expense',
            color: '#8b5cf6', // violet
            sortOrder: 0,
          },
          {
            name: 'Savings',
            color: '#3b82f6', // blue
            sortOrder: 1,
          },
        ],
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _unused, ...result } = user;
    return result;
  }

  async getProfile(userId: string): Promise<UserWithoutPassword> {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new UnauthorizedException();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = user;
    return result;
  }

  async updatePreferences(
    userId: string,
    data: { buttonStyle?: string; currency?: string; lastViewedPeriodId?: string },
  ) {
    return this.usersService.update(userId, data);
  }
}
