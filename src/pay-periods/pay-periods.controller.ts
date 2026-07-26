import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PayPeriodsService } from './pay-periods.service';
import { Prisma } from '@prisma/client';

@Controller('pay-periods')
export class PayPeriodsController {
  constructor(private readonly payPeriodsService: PayPeriodsService) {}

  @Post()
  create(@Body() data: Prisma.PayPeriodCreateInput) {
    return this.payPeriodsService.create(data);
  }

  @Get()
  findAll() {
    return this.payPeriodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payPeriodsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.PayPeriodUpdateInput) {
    return this.payPeriodsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payPeriodsService.remove(id);
  }
}
