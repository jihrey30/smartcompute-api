import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PayPeriodsService } from './pay-periods.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pay-periods')
export class PayPeriodsController {
  constructor(private readonly payPeriodsService: PayPeriodsService) {}

  @Post('generate')
  generateNext(@Request() req: { user: { userId: string } }) {
    return this.payPeriodsService.generateNext(req.user.userId);
  }

  @Post()
  create(
    @Request() req: { user: { userId: string } },
    @Body() data: Prisma.PayPeriodCreateWithoutUserInput,
  ) {
    return this.payPeriodsService.create(req.user.userId, data);
  }

  @Get()
  findAll(@Request() req: { user: { userId: string } }) {
    return this.payPeriodsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    return this.payPeriodsService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() data: Prisma.PayPeriodUpdateInput,
  ) {
    return this.payPeriodsService.update(req.user.userId, id, data);
  }

  @Delete(':id')
  remove(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    return this.payPeriodsService.remove(req.user.userId, id);
  }
}
