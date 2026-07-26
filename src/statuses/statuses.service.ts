import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StatusesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {

    return this.prisma.budgetStatus.create({ 
      data: {
        ...data,
        user: { connect: { id: userId } }
      } 
    });
  }

  findAll(userId: string) {
    return this.prisma.budgetStatus.findMany({
      where: { userId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  findOne(userId: string, id: string) {
    return this.prisma.budgetStatus.findFirst({ where: { id, userId } });
  }

  async update(userId: string, id: string, data: Prisma.BudgetStatusUpdateInput) {

    return this.prisma.budgetStatus.updateMany({
      where: { id, userId },
      data,
    });
  }

  remove(userId: string, id: string) {
    return this.prisma.budgetStatus.deleteMany({ where: { id, userId } });
  }
}
