import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('metrics')
@UseGuards(JwtAuthGuard)
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('dashboard')
  getDashboardMetrics(@Request() req) {
    return this.metricsService.getDashboardMetrics(req.user.userId);
  }
}
