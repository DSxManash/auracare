import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from '../utils/config.js';
import logger from '../utils/logger.js';

// Security headers middleware
export const securityHeaders = helmet({
  contentSecurityPolicy: false, // Disable CSP to avoid blocking CORS requests
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

// Rate limiting for auth endpoints
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 7, // limit each IP to 7 requests per windowMs for auth endpoints
  message: {
    error: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Rate limit exceeded for auth endpoint', {
      ip: req.ip,
      endpoint: req.originalUrl,
      userAgent: req.get('User-Agent')
    });
    res.status(429).json({
      error: 'Too many authentication attempts, please try again later.'
    });
  }
});

// General API rate limiting
export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Rate limit exceeded for API endpoint', {
      ip: req.ip,
      endpoint: req.originalUrl,
      userAgent: req.get('User-Agent')
    });
    res.status(429).json({
      error: 'Too many requests, please try again later.'
    });
  }
});

// CORS error handler
export const corsErrorHandler = (err, req, res, next) => {
  if (err && err.status === 403 && err.message.includes('CORS')) {
    return res.status(403).json({
      error: 'CORS policy violation',
      message: err.message,
    });
  }
  next(err);
};