/**
 * Database Configuration
 * PostgreSQL with Prisma ORM
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Connection handling
prisma.$connect()
  .then(() => console.log('✓ Database connected'))
  .catch((err) => console.error('✗ Database connection failed:', err));

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = { prisma };
