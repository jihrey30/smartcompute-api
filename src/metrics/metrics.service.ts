import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardMetrics(userId: string) {
    const periods = await this.prisma.payPeriod.findMany({
      where: { userId },
      orderBy: { payDate: 'desc' },
      select: {
        id: true,
        label: true,
        payDate: true,
        totalIncome: true,
        totalAllocated: true,
        items: {
          select: {
            id: true,
            type: true,
            status: {
              select: {
                slug: true,
                name: true
              }
            }
          }
        }
      }
    });

    const metrics = periods.map(period => {
      // Filter out INCOME items (we only track expenses/debts for milestones)
      const trackableItems = period.items.filter(item => item.type !== 'INCOME' && item.type !== 'SAVINGS');
      const totalItems = trackableItems.length;
      
      const paidItems = trackableItems.filter(
        item => item.status && (item.status.slug === 'paid' || item.status.name.toLowerCase() === 'paid')
      ).length;

      return {
        id: period.id,
        label: period.label,
        payDate: period.payDate,
        totalIncome: period.totalIncome,
        totalAllocated: period.totalAllocated,
        totalItems,
        paidItems,
        isComplete: totalItems > 0 && totalItems === paidItems
      };
    });

    // Calculate consecutive paydays (streak)
    let streak = 0;
    for (const p of metrics) {
      if (p.isComplete) streak++;
      else break;
    }

    return { periods: metrics, streak };
  }
}
