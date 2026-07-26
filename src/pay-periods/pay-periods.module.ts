import { Module } from '@nestjs/common';
import { PayPeriodsController } from './pay-periods.controller';
import { PayPeriodsService } from './pay-periods.service';

@Module({
  controllers: [PayPeriodsController],
  providers: [PayPeriodsService],
})
export class PayPeriodsModule {}
