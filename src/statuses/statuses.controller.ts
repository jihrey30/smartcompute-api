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
import { StatusesService } from './statuses.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Post()
  create(@Request() req: any, @Body() data: Prisma.BudgetStatusCreateInput) {
    return this.statusesService.create(req.user.userId, data);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.statusesService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.statusesService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() data: Prisma.BudgetStatusUpdateInput,
  ) {
    return this.statusesService.update(req.user.userId, id, data);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.statusesService.remove(req.user.userId, id);
  }
}
