import { Module } from '@nestjs/common';
import { PayScheduleController } from './pay-schedule.controller';
import { PayScheduleService } from './pay-schedule.service';

@Module({
  controllers: [PayScheduleController],
  providers: [PayScheduleService],
})
export class PayScheduleModule {}
