import { PayScheduleService } from './pay-schedule.service';
import { Prisma } from '@prisma/client';
export declare class PayScheduleController {
    private readonly payScheduleService;
    constructor(payScheduleService: PayScheduleService);
    getSettings(req: {
        user: {
            userId: string;
        };
    }): Promise<{
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
    upsertSettings(req: {
        user: {
            userId: string;
        };
    }, data: Prisma.PayScheduleCreateWithoutUserInput): Promise<{
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
