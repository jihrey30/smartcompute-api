import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BudgetItemsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BudgetItemCreateInput) {
    if (!data.status) {
      const payPeriodId = data.payPeriod.connect?.id;
      if (payPeriodId) {
        const payPeriod = await this.prisma.payPeriod.findUnique({
          where: { id: payPeriodId },
          select: { userId: true }
        });
        if (payPeriod) {
          const toPayStatus = await this.prisma.budgetStatus.findFirst({
            where: { userId: payPeriod.userId, slug: 'to-pay' }
          });
          if (toPayStatus) {
            data.status = { connect: { id: toPayStatus.id } };
          }
        }
      }
    }
    return this.prisma.budgetItem.create({ data });
  }

  findAll() {
    return this.prisma.budgetItem.findMany();
  }

  findOne(id: string) {
    return this.prisma.budgetItem.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.BudgetItemUpdateInput) {
    return this.prisma.budgetItem.update({
      where: { id },
      data,
    });
  }

  async updateBulk(items: { id: string; statusId: string | null; sortOrder: number }[]) {
    const updates = items.map(item => 
      this.prisma.budgetItem.update({
        where: { id: item.id },
        data: { 
          statusId: item.statusId,
          sortOrder: item.sortOrder 
        }
      })
    );
    return this.prisma.$transaction(updates);
  }

  remove(id: string) {
    return this.prisma.budgetItem.delete({ where: { id } });
  }
}
