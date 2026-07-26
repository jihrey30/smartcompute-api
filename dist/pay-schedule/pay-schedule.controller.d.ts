import { PayScheduleService } from './pay-schedule.service';
export declare class PayScheduleController {
    private readonly payScheduleService;
    constructor(payScheduleService: PayScheduleService);
    getSettings(req: any): Promise<{
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
    upsertSettings(req: any, data: any): Promise<{
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
