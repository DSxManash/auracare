import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Hash refresh token using SHA-256 (same as in auth.js)
const hashRefreshToken = (token) =>
  crypto.createHash('sha256').update(token).digest('hex');

async function main() {
  console.log('Starting database seed...');

  // Clear existing users (be careful with this in production!)
  await prisma.user.deleteMany({});
  console.log('Cleared existing users');

  // Test credentials for development
  const testUsers = [
    {
      email: 'test@example.com',
      password: 'Test123456', // Password meets requirements: 8+ chars, uppercase, lowercase, number
      name: 'Test User',
    },
    {
      email: 'admin@auracare.com',
      password: 'Admin123456',
      name: 'Admin User',
    },
    {
      email: 'demo@auracare.com',
      password: 'Demo123456',
      name: 'Demo User',
    },
  ];

  // Create users
  for (const testUser of testUsers) {
    const passwordHash = await bcrypt.hash(testUser.password, 12);
    const user = await prisma.user.create({
      data: {
        email: testUser.email,
        name: testUser.name,
        passwordHash,
        refreshToken: null, // No active session initially
      },
    });

    console.log(
      `✓ Created user: ${user.email} (${user.name})`
    );
    console.log(
      `  Password: ${testUser.password}`
    );
  }

  console.log('\n✓ Database seeding completed successfully!');
  console.log('\nTest Credentials for Login:');
  console.log('────────────────────────────');
  testUsers.forEach((user) => {
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${user.password}`);
    console.log(`Name: ${user.name}`);
    console.log('');
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seed error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
