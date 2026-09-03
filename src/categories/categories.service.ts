import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, data: Prisma.BudgetCategoryCreateInput) {
    return this.prisma.budgetCategory.create({ 
      data: {
        ...data,
        user: { connect: { id: userId } }
      } 
    });
  }

  findAll(userId: string) {
    return this.prisma.budgetCategory.findMany({
      where: { userId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOne(userId: string, id: string) {
    const cat = await this.prisma.budgetCategory.findUnique({ where: { id } });
    if (!cat || cat.userId !== userId) throw new UnauthorizedException();
    return cat;
  }

  async update(userId: string, id: string, data: Prisma.BudgetCategoryUpdateInput) {
    const cat = await this.prisma.budgetCategory.findUnique({ where: { id } });
    if (!cat || cat.userId !== userId) throw new UnauthorizedException();
    return this.prisma.budgetCategory.update({
      where: { id },
      data,
    });
  }

  async remove(userId: string, id: string) {
    const cat = await this.prisma.budgetCategory.findUnique({ where: { id } });
    if (!cat || cat.userId !== userId) throw new UnauthorizedException();
    return this.prisma.budgetCategory.delete({ where: { id } });
  }
}
