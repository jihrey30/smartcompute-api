import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PayPeriodsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.PayPeriodCreateInput) {
    return this.prisma.payPeriod.create({ data });
  }

  findAll() {
    return this.prisma.payPeriod.findMany({
      orderBy: { payDate: 'desc' },
      include: {
        items: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.payPeriod.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  }

  update(id: string, data: Prisma.PayPeriodUpdateInput) {
    return this.prisma.payPeriod.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.payPeriod.delete({ where: { id } });
  }
}
