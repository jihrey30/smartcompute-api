import { Module } from '@nestjs/common';
import { BudgetItemsController } from './budget-items.controller';
import { BudgetItemsService } from './budget-items.service';

@Module({
  controllers: [BudgetItemsController],
  providers: [BudgetItemsService],
})
export class BudgetItemsModule {}
