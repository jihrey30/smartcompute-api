import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.BudgetCategoryCreateInput) {
    return this.prisma.budgetCategory.create({ data });
  }

  findAll() {
    return this.prisma.budgetCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.budgetCategory.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.BudgetCategoryUpdateInput) {
    return this.prisma.budgetCategory.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.budgetCategory.delete({ where: { id } });
  }
}
