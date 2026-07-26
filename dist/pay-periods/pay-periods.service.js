"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayPeriodsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PayPeriodsService = class PayPeriodsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(userId, data) {
        return this.prisma.payPeriod.create({
            data: {
                ...data,
                user: { connect: { id: userId } },
            },
        });
    }
    findAll(userId) {
        return this.prisma.payPeriod.findMany({
            where: { userId },
            orderBy: { payDate: 'desc' },
            include: {
                items: {
                    include: {
                        category: true,
                        status: true,
                    },
                },
            },
        });
    }
    findOne(userId, id) {
        return this.prisma.payPeriod.findFirst({
            where: { id, userId },
            include: {
                items: {
                    include: {
                        category: true,
                        status: true,
                    },
                },
            },
        });
    }
    async update(userId, id, data) {
        const period = await this.prisma.payPeriod.findUnique({ where: { id } });
        if (!period || period.userId !== userId)
            throw new common_1.UnauthorizedException();
        return this.prisma.payPeriod.update({
            where: { id },
            data,
        });
    }
    remove(userId, id) {
        return this.prisma.payPeriod.deleteMany({ where: { id, userId } });
    }
    async generateNext(userId) {
        let schedule = await this.prisma.paySchedule.findUnique({
            where: { userId },
        });
        if (!schedule) {
            schedule = await this.prisma.paySchedule.create({
                data: {
                    user: { connect: { id: userId } },
                    frequency: 'SEMI_MONTHLY',
                    payDays: [15, 30],
                },
            });
        }
        const latestPeriod = await this.prisma.payPeriod.findFirst({
            where: { userId },
            orderBy: { payDate: 'desc' },
        });
        let nextPayDate;
        if (!latestPeriod) {
            nextPayDate = this.calculateNextPayDate(new Date(Date.now() - 86400000), schedule.frequency, schedule.payDays);
        }
        else {
            nextPayDate = this.calculateNextPayDate(latestPeriod.payDate, schedule.frequency, schedule.payDays);
        }
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const label = `${monthNames[nextPayDate.getMonth()]} ${nextPayDate.getDate()}`;
        const newPeriod = await this.prisma.payPeriod.create({
            data: {
                user: { connect: { id: userId } },
                label,
                payDate: nextPayDate,
            },
        });
        const automations = await this.prisma.automation.findMany({
            where: { userId, isActive: true },
        });
        const currentDay = nextPayDate.getDate();
        const isFirstPayday = currentDay === schedule.payDays[0];
        const isSecondPayday = currentDay === schedule.payDays[1];
        const toPayStatus = await this.prisma.budgetStatus.findFirst({
            where: { userId, slug: 'to-pay' },
        });
        for (const item of automations) {
            if (item.recurrence === 'FIRST_PAYDAY' && !isFirstPayday)
                continue;
            if (item.recurrence === 'SECOND_PAYDAY' && !isSecondPayday)
                continue;
            await this.prisma.budgetItem.create({
                data: {
                    payPeriod: { connect: { id: newPeriod.id } },
                    automation: { connect: { id: item.id } },
                    category: item.categoryId
                        ? { connect: { id: item.categoryId } }
                        : undefined,
                    name: item.name,
                    type: item.type,
                    amount: item.defaultAmount,
                    isStarred: item.isStarred,
                    sortOrder: item.sortOrder,
                    notes: item.notes,
                    ...(toPayStatus
                        ? { status: { connect: { id: toPayStatus.id } } }
                        : {}),
                },
            });
        }
        return this.prisma.payPeriod.findUnique({
            where: { id: newPeriod.id },
            include: {
                items: {
                    include: { category: true, status: true },
                },
            },
        });
    }
    calculateNextPayDate(afterDate, frequency, payDays) {
        const curr = new Date(afterDate);
        curr.setHours(0, 0, 0, 0);
        if (frequency === 'MONTHLY') {
            const target = payDays[0] || 20;
            while (true) {
                curr.setDate(curr.getDate() + 1);
                if (curr.getDate() === target)
                    return curr;
            }
        }
        else if (frequency === 'SEMI_MONTHLY') {
            const target1 = payDays[0] || 15;
            const target2 = payDays[1] || 30;
            while (true) {
                curr.setDate(curr.getDate() + 1);
                if (curr.getDate() === target1 || curr.getDate() === target2)
                    return curr;
            }
        }
        curr.setDate(curr.getDate() + 14);
        return curr;
    }
};
exports.PayPeriodsService = PayPeriodsService;
exports.PayPeriodsService = PayPeriodsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayPeriodsService);
//# sourceMappingURL=pay-periods.service.js.map