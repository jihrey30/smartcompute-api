import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PayScheduleService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.PayScheduleCreateInput) {
    return this.prisma.paySchedule.create({ data });
  }

  findAll() {
    return this.prisma.paySchedule.findMany();
  }

  findOne(id: string) {
    return this.prisma.paySchedule.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.PayScheduleUpdateInput) {
    return this.prisma.paySchedule.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.paySchedule.delete({ where: { id } });
  }
}
