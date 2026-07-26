import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add your seed functions here. The key is the unique name of the seed,
// and the value is the function that performs the seeding.
const seeders: Record<string, () => Promise<void>> = {
  '01-init-categories': async () => {
    // Example: Seed default categories
    console.log('Seeding default categories...');
    /*
    await prisma.budgetCategory.create({
      data: {
        userId: 'some-user-id',
        name: 'Necessities',
        color: '#000000',
        sortOrder: 1,
      },
    });
    */
  },
  '03-init-user': async () => {
    console.log('Seeding default user...');
    
    // Create a default test user if one doesn't exist
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: 'test@example.com',
          passwordHash: 'dummy-hash',
          name: 'Demo User',
        }
      });
      console.log('Default user created.');
    }
  },
};

async function main() {
  console.log('Starting seed process...');

  for (const [seedName, seedFunction] of Object.entries(seeders)) {
    // Check if this seed has already been run
    const existingSeed = await prisma.seedHistory.findUnique({
      where: { name: seedName },
    });

    if (existingSeed) {
      console.log(`[SKIPPED] Seed '${seedName}' has already been executed.`);
      continue; // Skip to the next seed
    }

    try {
      console.log(`[RUNNING] Seed '${seedName}'...`);
      // Run the seed function
      await seedFunction();

      // Record successful execution so it won't run again
      await prisma.seedHistory.create({
        data: { name: seedName },
      });
      console.log(`[SUCCESS] Seed '${seedName}' completed and recorded.`);
    } catch (error) {
      console.error(`[FAILED] Seed '${seedName}' failed with error:`, error);
      // We throw the error to halt the process entirely.
      // This prevents subsequent seeds from running if a dependency fails.
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
