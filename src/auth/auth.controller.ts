import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService, UserWithoutPassword } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: UserWithoutPassword }) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.authService.register(createUserDto);
  }
}
