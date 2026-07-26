import { PayPeriodsService } from './pay-periods.service';
import { Prisma } from '@prisma/client';
export declare class PayPeriodsController {
    private readonly payPeriodsService;
    constructor(payPeriodsService: PayPeriodsService);
    create(data: Prisma.PayPeriodCreateInput): Prisma.Prisma__PayPeriodClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        label: string;
        payDate: Date;
        periodStart: Date | null;
        periodEnd: Date | null;
        totalAllocated: Prisma.Decimal;
        totalIncome: Prisma.Decimal;
        totalBalance: Prisma.Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<({
        items: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            sortOrder: number;
            type: import("@prisma/client").$Enums.ItemType;
            isStarred: boolean;
            notes: string | null;
            categoryId: string | null;
            amount: Prisma.Decimal;
            status: import("@prisma/client").$Enums.ItemStatus;
            payPeriodId: string;
            templateId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        label: string;
        payDate: Date;
        periodStart: Date | null;
        periodEnd: Date | null;
        totalAllocated: Prisma.Decimal;
        totalIncome: Prisma.Decimal;
        totalBalance: Prisma.Decimal;
    })[]>;
    findOne(id: string): Prisma.Prisma__PayPeriodClient<({
        items: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            sortOrder: number;
            type: import("@prisma/client").$Enums.ItemType;
            isStarred: boolean;
            notes: string | null;
            categoryId: string | null;
            amount: Prisma.Decimal;
            status: import("@prisma/client").$Enums.ItemStatus;
            payPeriodId: string;
            templateId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        label: string;
        payDate: Date;
        periodStart: Date | null;
        periodEnd: Date | null;
        totalAllocated: Prisma.Decimal;
        totalIncome: Prisma.Decimal;
        totalBalance: Prisma.Decimal;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, data: Prisma.PayPeriodUpdateInput): Prisma.Prisma__PayPeriodClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        label: string;
        payDate: Date;
        periodStart: Date | null;
        periodEnd: Date | null;
        totalAllocated: Prisma.Decimal;
        totalIncome: Prisma.Decimal;
        totalBalance: Prisma.Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__PayPeriodClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        label: string;
        payDate: Date;
        periodStart: Date | null;
        periodEnd: Date | null;
        totalAllocated: Prisma.Decimal;
        totalIncome: Prisma.Decimal;
        totalBalance: Prisma.Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
