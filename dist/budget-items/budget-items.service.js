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
exports.BudgetItemsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BudgetItemsService = class BudgetItemsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        if (!data.status) {
            const payPeriodId = data.payPeriod.connect?.id;
            if (payPeriodId) {
                const payPeriod = await this.prisma.payPeriod.findUnique({
                    where: { id: payPeriodId },
                    select: { userId: true },
                });
                if (payPeriod) {
                    const toPayStatus = await this.prisma.budgetStatus.findFirst({
                        where: { userId: payPeriod.userId, slug: 'to-pay' },
                    });
                    if (toPayStatus) {
                        data.status = { connect: { id: toPayStatus.id } };
                    }
                }
            }
        }
        return this.prisma.budgetItem.create({ data });
    }
    findAll() {
        return this.prisma.budgetItem.findMany();
    }
    findOne(id) {
        return this.prisma.budgetItem.findUnique({ where: { id } });
    }
    update(id, data) {
        return this.prisma.budgetItem.update({
            where: { id },
            data,
        });
    }
    async updateBulk(items) {
        const updates = items.map((item) => this.prisma.budgetItem.update({
            where: { id: item.id },
            data: {
                statusId: item.statusId,
                sortOrder: item.sortOrder,
            },
        }));
        return this.prisma.$transaction(updates);
    }
    remove(id) {
        return this.prisma.budgetItem.delete({ where: { id } });
    }
};
exports.BudgetItemsService = BudgetItemsService;
exports.BudgetItemsService = BudgetItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BudgetItemsService);
//# sourceMappingURL=budget-items.service.js.map