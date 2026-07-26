import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.passwordHash) {
      const isMatch = await bcrypt.compare(pass, user.passwordHash);
      if (isMatch) {
        const { passwordHash, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(data: Prisma.UserCreateInput) {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }
    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(data.passwordHash as string, saltOrRounds);
    
    const user = await this.usersService.create({
      ...data,
      passwordHash,
    });
    
    const { passwordHash: _, ...result } = user;
    return result;
  }
}
