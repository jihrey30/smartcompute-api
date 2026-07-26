import { PrismaService } from '../prisma/prisma.service';
export declare class PayScheduleService {
    private prisma;
    constructor(prisma: PrismaService);
    getSettings(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        frequency: import("@prisma/client").$Enums.PayFrequency;
        payDays: number[];
        anchorWeekday: number | null;
        anchorDate: Date | null;
        timezone: string;
        userId: string;
    }>;
    upsertSettings(userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        frequency: import("@prisma/client").$Enums.PayFrequency;
        payDays: number[];
        anchorWeekday: number | null;
        anchorDate: Date | null;
        timezone: string;
        userId: string;
    }>;
}
