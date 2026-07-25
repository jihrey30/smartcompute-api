import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.BudgetCategoryCreateInput): Prisma.Prisma__BudgetCategoryClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        color: string;
        sortOrder: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        color: string;
        sortOrder: number;
    }[]>;
    findOne(id: string): Prisma.Prisma__BudgetCategoryClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        color: string;
        sortOrder: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, data: Prisma.BudgetCategoryUpdateInput): Prisma.Prisma__BudgetCategoryClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        color: string;
        sortOrder: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__BudgetCategoryClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        color: string;
        sortOrder: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
