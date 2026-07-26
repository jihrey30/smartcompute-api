import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PayScheduleModule } from './pay-schedule/pay-schedule.module';
import { CategoriesModule } from './categories/categories.module';
import { TemplatesModule } from './templates/templates.module';
import { PayPeriodsModule } from './pay-periods/pay-periods.module';
import { BudgetItemsModule } from './budget-items/budget-items.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    PayScheduleModule,
    CategoriesModule,
    TemplatesModule,
    PayPeriodsModule,
    BudgetItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
