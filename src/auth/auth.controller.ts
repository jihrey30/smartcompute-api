import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService, UserWithoutPassword } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: { user: { userId: string } }) {
    // The JwtAuthGuard populates req.user with { userId, email, role }
    return this.authService.getProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('preferences')
  async updatePreferences(
    @Request() req: { user: { userId: string } },
    @Body() data: { buttonStyle?: string; currency?: string; lastViewedPeriodId?: string },
  ) {
    return this.authService.updatePreferences(req.user.userId, data);
  }
}
