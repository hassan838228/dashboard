const { PrismaClient } = require('@prisma/client');
const { logger } = require('../utils/logger');

let prisma;

const connectDB = async () => {
  try {
    if (!prisma) {
      prisma = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
      });

      await prisma.$connect();
      logger.info('Connected to PostgreSQL database');
    }
    return prisma;
  } catch (error) {
    logger.error('Database connection failed:', error);
    throw error;
  }
};

const disconnectDB = async () => {
  if (prisma) {
    await prisma.$disconnect();
    logger.info('Disconnected from database');
  }
};

const getDB = () => {
  if (!prisma) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return prisma;
};

module.exports = {
  connectDB,
  disconnectDB,
  getDB,
};