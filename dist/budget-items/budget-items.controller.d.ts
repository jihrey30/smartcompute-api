import { BudgetItemsService } from './budget-items.service';
import { Prisma } from '@prisma/client';
export declare class BudgetItemsController {
    private readonly budgetItemsService;
    constructor(budgetItemsService: BudgetItemsService);
    create(data: Prisma.BudgetItemCreateInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sortOrder: number;
        type: import("@prisma/client").$Enums.ItemType;
        isStarred: boolean;
        notes: string | null;
        categoryId: string | null;
        payPeriodId: string;
        automationId: string | null;
        statusId: string | null;
        amount: Prisma.Decimal;
        targetDate: Date | null;
    }>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sortOrder: number;
        type: import("@prisma/client").$Enums.ItemType;
        isStarred: boolean;
        notes: string | null;
        categoryId: string | null;
        payPeriodId: string;
        automationId: string | null;
        statusId: string | null;
        amount: Prisma.Decimal;
        targetDate: Date | null;
    }[]>;
    updateBulk(data: {
        items: {
            id: string;
            statusId: string | null;
            sortOrder: number;
        }[];
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sortOrder: number;
        type: import("@prisma/client").$Enums.ItemType;
        isStarred: boolean;
        notes: string | null;
        categoryId: string | null;
        payPeriodId: string;
        automationId: string | null;
        statusId: string | null;
        amount: Prisma.Decimal;
        targetDate: Date | null;
    }[]>;
    findOne(id: string): Prisma.Prisma__BudgetItemClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sortOrder: number;
        type: import("@prisma/client").$Enums.ItemType;
        isStarred: boolean;
        notes: string | null;
        categoryId: string | null;
        payPeriodId: string;
        automationId: string | null;
        statusId: string | null;
        amount: Prisma.Decimal;
        targetDate: Date | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, data: Prisma.BudgetItemUpdateInput): Prisma.Prisma__BudgetItemClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sortOrder: number;
        type: import("@prisma/client").$Enums.ItemType;
        isStarred: boolean;
        notes: string | null;
        categoryId: string | null;
        payPeriodId: string;
        automationId: string | null;
        statusId: string | null;
        amount: Prisma.Decimal;
        targetDate: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__BudgetItemClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sortOrder: number;
        type: import("@prisma/client").$Enums.ItemType;
        isStarred: boolean;
        notes: string | null;
        categoryId: string | null;
        payPeriodId: string;
        automationId: string | null;
        statusId: string | null;
        amount: Prisma.Decimal;
        targetDate: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
