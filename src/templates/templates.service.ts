import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.BudgetItemTemplateCreateInput) {
    return this.prisma.budgetItemTemplate.create({ data });
  }

  findAll() {
    return this.prisma.budgetItemTemplate.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.budgetItemTemplate.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.BudgetItemTemplateUpdateInput) {
    return this.prisma.budgetItemTemplate.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.budgetItemTemplate.delete({ where: { id } });
  }
}
