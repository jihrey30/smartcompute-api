import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BudgetItemsService } from './budget-items.service';
import { Prisma } from '@prisma/client';

@Controller('budget-items')
export class BudgetItemsController {
  constructor(private readonly budgetItemsService: BudgetItemsService) {}

  @Post()
  create(@Body() data: Prisma.BudgetItemCreateInput) {
    return this.budgetItemsService.create(data);
  }

  @Get()
  findAll() {
    return this.budgetItemsService.findAll();
  }

  @Patch('bulk-update')
  updateBulk(
    @Body()
    data: {
      items: { id: string; statusId: string | null; sortOrder: number }[];
    },
  ) {
    return this.budgetItemsService.updateBulk(data.items);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetItemsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.BudgetItemUpdateInput) {
    return this.budgetItemsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetItemsService.remove(id);
  }
}
