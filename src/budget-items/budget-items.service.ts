import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BudgetItemsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: Prisma.BudgetItemCreateInput) {
    const payPeriodId = data.payPeriod.connect?.id;
    if (payPeriodId) {
      const payPeriod = await this.prisma.payPeriod.findUnique({
        where: { id: payPeriodId },
        select: { userId: true, isLocked: true },
      });
      if (!payPeriod || payPeriod.userId !== userId) {
        throw new UnauthorizedException('Invalid pay period');
      }
      if (payPeriod.isLocked) {
        throw new BadRequestException('Pay period is locked');
      }
      if (!data.status) {
        const toPayStatus = await this.prisma.budgetStatus.findFirst({
          where: { userId: payPeriod.userId, slug: 'to-pay' },
        });
        if (toPayStatus) {
          data.status = { connect: { id: toPayStatus.id } };
        }
      }
    }
    return this.prisma.budgetItem.create({ data });
  }

  findAll(userId: string) {
    return this.prisma.budgetItem.findMany({
      where: { payPeriod: { userId } },
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        status: true,
        payPeriod: true,
        automation: true,
      }
    });
  }

  async findOne(userId: string, id: string) {
    const item = await this.prisma.budgetItem.findUnique({ where: { id }, include: { payPeriod: true } });
    if (!item || item.payPeriod.userId !== userId) throw new UnauthorizedException();
    return item;
  }

  async update(userId: string, id: string, data: Prisma.BudgetItemUpdateInput) {
    const item = await this.prisma.budgetItem.findUnique({ where: { id }, include: { payPeriod: true } });
    if (!item || item.payPeriod.userId !== userId) throw new UnauthorizedException();
    if (item.payPeriod.isLocked) throw new BadRequestException('Pay period is locked');
    return this.prisma.budgetItem.update({
      where: { id },
      data,
    });
  }

  async updateBulk(
    userId: string,
    items: { id: string; statusId: string | null; sortOrder: number }[],
  ) {
    const validItems = await this.prisma.budgetItem.findMany({
      where: { id: { in: items.map(i => i.id) }, payPeriod: { userId } },
      include: { payPeriod: true }
    });
    if (validItems.some(item => item.payPeriod.isLocked)) {
      throw new BadRequestException('Pay period is locked');
    }
    const validIds = new Set(validItems.map(i => i.id));
    
    const updates = items.filter(item => validIds.has(item.id)).map((item) =>
      this.prisma.budgetItem.update({
        where: { id: item.id },
        data: {
          statusId: item.statusId,
          sortOrder: item.sortOrder,
        },
      }),
    );
    return this.prisma.$transaction(updates);
  }

  async reorder(
    userId: string,
    items: { id: string; sortOrder: number }[],
  ) {
    const validItems = await this.prisma.budgetItem.findMany({
      where: { id: { in: items.map(i => i.id) }, payPeriod: { userId } },
      include: { payPeriod: true }
    });
    if (validItems.some(item => item.payPeriod.isLocked)) {
      throw new BadRequestException('Pay period is locked');
    }
    const validIds = new Set(validItems.map(i => i.id));
    
    const updates = items.filter(item => validIds.has(item.id)).map((item) =>
      this.prisma.budgetItem.update({
        where: { id: item.id },
        data: {
          sortOrder: item.sortOrder,
        },
      }),
    );
    return this.prisma.$transaction(updates);
  }

  async remove(userId: string, id: string) {
    const item = await this.prisma.budgetItem.findUnique({ where: { id }, include: { payPeriod: true } });
    if (!item || item.payPeriod.userId !== userId) throw new UnauthorizedException();
    if (item.payPeriod.isLocked) throw new BadRequestException('Pay period is locked');
    return this.prisma.budgetItem.delete({ where: { id } });
  }
}
