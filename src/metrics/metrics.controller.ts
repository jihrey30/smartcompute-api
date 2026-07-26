import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('metrics')
@UseGuards(JwtAuthGuard)
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('dashboard')
  getDashboardMetrics(@Request() req: { user: { userId: string } }) {
    return this.metricsService.getDashboardMetrics(req.user.userId);
  }
}
