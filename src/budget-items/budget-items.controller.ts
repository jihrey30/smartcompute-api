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
import { BudgetItemsService } from './budget-items.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('budget-items')
export class BudgetItemsController {
  constructor(private readonly budgetItemsService: BudgetItemsService) {}

  @Post()
  create(@Request() req: any, @Body() data: Prisma.BudgetItemCreateInput) {
    return this.budgetItemsService.create(req.user.userId, data);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.budgetItemsService.findAll(req.user.userId);
  }

  @Patch('bulk-update')
  updateBulk(
    @Request() req: any,
    @Body()
    data: {
      items: { id: string; statusId: string | null; sortOrder: number }[];
    },
  ) {
    return this.budgetItemsService.updateBulk(req.user.userId, data.items);
  }

  @Patch('reorder')
  reorder(
    @Request() req: any,
    @Body()
    data: {
      items: { id: string; sortOrder: number }[];
    },
  ) {
    return this.budgetItemsService.reorder(req.user.userId, data.items);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.budgetItemsService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() data: Prisma.BudgetItemUpdateInput) {
    return this.budgetItemsService.update(req.user.userId, id, data);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.budgetItemsService.remove(req.user.userId, id);
  }
}
