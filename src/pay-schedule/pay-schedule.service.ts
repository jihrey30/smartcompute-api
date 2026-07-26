import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PayScheduleService {
  constructor(private prisma: PrismaService) {}

  async getSettings(userId: string) {
    let schedule = await this.prisma.paySchedule.findUnique({ where: { userId } });
    if (!schedule) {
      schedule = await this.prisma.paySchedule.create({
        data: {
          user: { connect: { id: userId } },
          frequency: 'SEMI_MONTHLY',
          payDays: [15, 30],
        }
      });
    }
    return schedule;
  }

  async upsertSettings(userId: string, data: any) {
    const { frequency, payDays } = data;
    return this.prisma.paySchedule.upsert({
      where: { userId },
      update: { frequency, payDays },
      create: {
        user: { connect: { id: userId } },
        frequency,
        payDays,
      }
    });
  }
}
