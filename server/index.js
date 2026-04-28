import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import prisma from './utils/prisma.js';
import { config } from './utils/config.js';
import logger from './utils/logger.js';
import { securityHeaders, apiRateLimit, corsErrorHandler } from './middleware/security.js';
import { healthCheck, readinessCheck } from './middleware/health.js';
import { errorHandler, notFound } from './middleware/error.js';

const app = express();

// Trust proxy for secure cookies (important for production behind reverse proxy)
app.set('trust proxy', 1);

// Security headers
app.use(securityHeaders);

// Compression middleware
app.use(compression());

// Logging middleware
if (config.nodeEnv === 'production') {
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  }));
} else {
  app.use(morgan('dev'));
}

// CORS configuration
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// API rate limiting
app.use('/api/', apiRateLimit);

// Health check endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'Auracare API Server',
    version: '1.0.0',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', healthCheck);
app.get('/api/health/ready', readinessCheck);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// CORS error handler
app.use(corsErrorHandler);

// 404 handler
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  logger.info(`Received ${signal}, shutting down gracefully...`);

  server.close(() => {
    logger.info('HTTP server closed');
    prisma.$disconnect()
      .then(() => {
        logger.info('Database connection closed');
        process.exit(0);
      })
      .catch((error) => {
        logger.error('Error during database disconnect', error);
        process.exit(1);
      });
  });

  // Force close server after 10 seconds
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server
const server = app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
  logger.info(`Health check available at http://localhost:${config.port}/api/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error('Unhandled Promise Rejection', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', err);
  process.exit(1);
});

export default app;
