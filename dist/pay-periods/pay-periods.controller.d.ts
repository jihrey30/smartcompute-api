import { PayPeriodsService } from './pay-periods.service';
import { Prisma } from '@prisma/client';
export declare class PayPeriodsController {
    private readonly payPeriodsService;
    constructor(payPeriodsService: PayPeriodsService);
    generateNext(req: {
        user: {
            userId: string;
        };
    }): Promise<({
        items: ({
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                color: string;
                sortOrder: number;
            } | null;
            status: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                color: string;
                sortOrder: number;
                slug: string | null;
            } | null;
        } & {
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
        })[];
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
    }) | null>;
    create(req: {
        user: {
            userId: string;
        };
    }, data: Prisma.PayPeriodCreateWithoutUserInput): Prisma.Prisma__PayPeriodClient<{
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
    findAll(req: {
        user: {
            userId: string;
        };
    }): Prisma.PrismaPromise<({
        items: ({
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                color: string;
                sortOrder: number;
            } | null;
            status: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                color: string;
                sortOrder: number;
                slug: string | null;
            } | null;
        } & {
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
        })[];
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
    findOne(req: {
        user: {
            userId: string;
        };
    }, id: string): Prisma.Prisma__PayPeriodClient<({
        items: ({
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                color: string;
                sortOrder: number;
            } | null;
            status: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                color: string;
                sortOrder: number;
                slug: string | null;
            } | null;
        } & {
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
        })[];
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
    update(req: {
        user: {
            userId: string;
        };
    }, id: string, data: Prisma.PayPeriodUpdateInput): Promise<{
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
    }>;
    remove(req: {
        user: {
            userId: string;
        };
    }, id: string): Prisma.PrismaPromise<Prisma.BatchPayload>;
}
