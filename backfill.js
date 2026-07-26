const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const statuses = await prisma.budgetStatus.findMany();
  for (const status of statuses) {
    if (!status.slug) {
      let slug = status.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      // Ensure unique slug per user
      let count = 0;
      let finalSlug = slug;
      while (true) {
        const existing = await prisma.budgetStatus.findFirst({
          where: { userId: status.userId, slug: finalSlug, id: { not: status.id } }
        });
        if (!existing) break;
        count++;
        finalSlug = `${slug}-${count}`;
      }
      await prisma.budgetStatus.update({
        where: { id: status.id },
        data: { slug: finalSlug }
      });
      console.log(`Updated status ${status.id} with slug ${finalSlug}`);
    }
  }

  // Also add 'to-pay' for all existing users if they don't have one
  const users = await prisma.user.findMany();
  for (const user of users) {
    const toPay = await prisma.budgetStatus.findFirst({
      where: { userId: user.id, slug: 'to-pay' }
    });
    if (!toPay) {
      await prisma.budgetStatus.create({
        data: {
          name: 'To Pay',
          slug: 'to-pay',
          color: '#f59e0b',
          userId: user.id,
          sortOrder: -1 // put it at top
        }
      });
      console.log(`Created To Pay for user ${user.id}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
