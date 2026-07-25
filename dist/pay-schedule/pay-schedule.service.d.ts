import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class PayScheduleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.PayScheduleCreateInput): Prisma.Prisma__PayScheduleClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        frequency: import("@prisma/client").$Enums.PayFrequency;
        payDays: number[];
        anchorWeekday: number | null;
        anchorDate: Date | null;
        timezone: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        frequency: import("@prisma/client").$Enums.PayFrequency;
        payDays: number[];
        anchorWeekday: number | null;
        anchorDate: Date | null;
        timezone: string;
        userId: string;
    }[]>;
    findOne(id: string): Prisma.Prisma__PayScheduleClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        frequency: import("@prisma/client").$Enums.PayFrequency;
        payDays: number[];
        anchorWeekday: number | null;
        anchorDate: Date | null;
        timezone: string;
        userId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, data: Prisma.PayScheduleUpdateInput): Prisma.Prisma__PayScheduleClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        frequency: import("@prisma/client").$Enums.PayFrequency;
        payDays: number[];
        anchorWeekday: number | null;
        anchorDate: Date | null;
        timezone: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__PayScheduleClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        frequency: import("@prisma/client").$Enums.PayFrequency;
        payDays: number[];
        anchorWeekday: number | null;
        anchorDate: Date | null;
        timezone: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
