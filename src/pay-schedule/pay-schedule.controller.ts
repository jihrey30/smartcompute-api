import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayScheduleService } from './pay-schedule.service';
import { Prisma } from '@prisma/client';

@Controller('pay-schedule')
export class PayScheduleController {
  constructor(private readonly payScheduleService: PayScheduleService) {}

  @Post()
  create(@Body() data: Prisma.PayScheduleCreateInput) {
    return this.payScheduleService.create(data);
  }

  @Get()
  findAll() {
    return this.payScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payScheduleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.PayScheduleUpdateInput) {
    return this.payScheduleService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payScheduleService.remove(id);
  }
}
