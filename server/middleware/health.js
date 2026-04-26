import prisma from '../utils/prisma.js';
import logger from '../utils/logger.js';

// Enhanced health check with database connectivity
export const healthCheck = async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    services: {
      database: 'DOWN'
    }
  };

  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    healthcheck.services.database = 'UP';
  } catch (error) {
    logger.error('Database health check failed', { error: error.message });
    healthcheck.services.database = 'DOWN';
    healthcheck.message = 'Database connection failed';
    return res.status(503).json(healthcheck);
  }

  // Check if all services are up
  const allServicesUp = Object.values(healthcheck.services).every(status => status === 'UP');

  if (!allServicesUp) {
    return res.status(503).json(healthcheck);
  }

  res.status(200).json(healthcheck);
};

// Readiness check (for Kubernetes/load balancers)
export const readinessCheck = async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ready' });
  } catch (error) {
    logger.error('Readiness check failed', { error: error.message });
    res.status(503).json({ status: 'not ready', error: 'Database connection failed' });
  }
};