import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ItemType, AutomationRecurrence } from '@prisma/client';

@Injectable()
export class AutomationsService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    data: {
      name: string;
      defaultAmount: number;
      type?: ItemType;
      isActive?: boolean;
      recurrence?: AutomationRecurrence;
      startPayPeriodId?: string;
    },
  ) {
    const automation = await this.prisma.automation.upsert({
      where: {
        userId_name: {
          userId,
          name: data.name,
        },
      },
      update: {
        defaultAmount: data.defaultAmount,
        type: data.type,
        isActive: data.isActive,
        recurrence: data.recurrence,
      },
      create: {
        name: data.name,
        defaultAmount: data.defaultAmount,
        type: data.type,
        isActive: data.isActive,
        recurrence: data.recurrence,
        user: { connect: { id: userId } },
      },
    });

    if (data.startPayPeriodId) {
      const startPeriod = await this.prisma.payPeriod.findUnique({
        where: { id: data.startPayPeriodId },
      });

      if (startPeriod) {
        const schedule = await this.prisma.paySchedule.findUnique({
          where: { userId },
        });
        if (schedule) {
          const otherPeriods = await this.prisma.payPeriod.findMany({
            where: {
              userId,
              id: { not: startPeriod.id },
            },
            orderBy: { payDate: 'asc' },
          });

          const toPayStatus = await this.prisma.budgetStatus.findFirst({
            where: { userId, slug: 'to-pay' },
          });

          for (const period of otherPeriods) {
            const currentDay = period.payDate.getDate();
            const isFirstPayday = currentDay === schedule.payDays[0];
            const isSecondPayday = currentDay === schedule.payDays[1];

            if (automation.recurrence === 'FIRST_PAYDAY' && !isFirstPayday)
              continue;
            if (automation.recurrence === 'SECOND_PAYDAY' && !isSecondPayday)
              continue;

            // Check if item already exists in this future pay period to prevent duplicates
            const existingItem = await this.prisma.budgetItem.findFirst({
              where: {
                payPeriodId: period.id,
                name: automation.name,
              },
            });

            if (!existingItem) {
              await this.prisma.budgetItem.create({
                data: {
                  name: automation.name,
                  amount: automation.defaultAmount,
                  type: automation.type,
                  payPeriod: { connect: { id: period.id } },
                  automation: { connect: { id: automation.id } },
                  category: automation.categoryId
                    ? { connect: { id: automation.categoryId } }
                    : undefined,
                  ...(toPayStatus
                    ? { status: { connect: { id: toPayStatus.id } } }
                    : {}),
                },
              });
            }
          }
        }
      }
    }

    return automation;
  }

  findAll(userId: string) {
    return this.prisma.automation.findMany({
      where: { userId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  findOne(userId: string, id: string) {
    return this.prisma.automation.findFirst({ where: { id, userId } });
  }

  async update(userId: string, id: string, data: Prisma.AutomationUpdateInput) {
    const item = await this.prisma.automation.findUnique({ where: { id } });
    if (!item || item.userId !== userId) {
      throw new UnauthorizedException();
    }
    return this.prisma.automation.update({
      where: { id },
      data,
    });
  }

  remove(userId: string, id: string) {
    return this.prisma.automation.deleteMany({ where: { id, userId } });
  }
}
