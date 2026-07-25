import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BudgetItemsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.BudgetItemCreateInput) {
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

  remove(id: string) {
    return this.prisma.budgetItem.delete({ where: { id } });
  }
}
