"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const seeders = {
    '01-init-categories': async () => {
        console.log('Seeding default categories...');
    },
    '02-init-templates': async () => {
        console.log('Seeding budget templates...');
    },
};
async function main() {
    console.log('Starting seed process...');
    for (const [seedName, seedFunction] of Object.entries(seeders)) {
        const existingSeed = await prisma.seedHistory.findUnique({
            where: { name: seedName },
        });
        if (existingSeed) {
            console.log(`[SKIPPED] Seed '${seedName}' has already been executed.`);
            continue;
        }
        try {
            console.log(`[RUNNING] Seed '${seedName}'...`);
            await seedFunction();
            await prisma.seedHistory.create({
                data: { name: seedName },
            });
            console.log(`[SUCCESS] Seed '${seedName}' completed and recorded.`);
        }
        catch (error) {
            console.error(`[FAILED] Seed '${seedName}' failed with error:`, error);
            throw error;
        }
    }
    console.log('Seed process finished.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map