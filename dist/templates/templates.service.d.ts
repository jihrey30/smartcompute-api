import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class TemplatesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.BudgetItemTemplateCreateInput): Prisma.Prisma__BudgetItemTemplateClient<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        sortOrder: number;
        type: import("@prisma/client").$Enums.ItemType;
        defaultAmount: Prisma.Decimal;
        isStarred: boolean;
        notes: string | null;
        categoryId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        sortOrder: number;
        type: import("@prisma/client").$Enums.ItemType;
        defaultAmount: Prisma.Decimal;
        isStarred: boolean;
        notes: string | null;
        categoryId: string | null;
    }[]>;
    findOne(id: string): Prisma.Prisma__BudgetItemTemplateClient<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        sortOrder: number;
        type: import("@prisma/client").$Enums.ItemType;
        defaultAmount: Prisma.Decimal;
        isStarred: boolean;
        notes: string | null;
        categoryId: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, data: Prisma.BudgetItemTemplateUpdateInput): Prisma.Prisma__BudgetItemTemplateClient<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        sortOrder: number;
        type: import("@prisma/client").$Enums.ItemType;
        defaultAmount: Prisma.Decimal;
        isStarred: boolean;
        notes: string | null;
        categoryId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__BudgetItemTemplateClient<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        sortOrder: number;
        type: import("@prisma/client").$Enums.ItemType;
        defaultAmount: Prisma.Decimal;
        isStarred: boolean;
        notes: string | null;
        categoryId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
