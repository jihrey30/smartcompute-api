import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PayScheduleService } from './pay-schedule.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pay-schedule')
export class PayScheduleController {
  constructor(private readonly payScheduleService: PayScheduleService) {}

  @Get()
  getSettings(@Request() req: any) {
    return this.payScheduleService.getSettings(req.user.userId);
  }

  @Post()
  upsertSettings(@Request() req: any, @Body() data: any) {
    return this.payScheduleService.upsertSettings(req.user.userId, data);
  }
}
