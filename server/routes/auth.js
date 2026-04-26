import { Router } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import prisma from '../utils/prisma.js';
import { config } from '../utils/config.js';
import { authRateLimit } from '../middleware/security.js';
import { validateRegistration, validateLogin } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/error.js';
import logger from '../utils/logger.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/token.js';

const router = Router();

// Apply rate limiting to auth routes
router.use(authRateLimit);

// Cookie options for refresh token
const refreshCookieOptions = {
  httpOnly: true,
  secure: config.nodeEnv === 'production',
  sameSite: 'lax', // prevents CSRF while allowing cross-origin in development
  maxAge: config.refreshTokenExpiryMs,
  path: '/',
};

// Test endpoint to verify the auth route is working
router.get('/', (req, res) => {
  res.json({ message: 'Auth API Working' });
});

// Hash refresh token using SHA-256
const hashRefreshToken = (token) =>
  crypto.createHash('sha256').update(token).digest('hex');

// Register endpoint - creates a new user and issues tokens
router.post('/register', validateRegistration, asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  logger.info('Registration attempt', { email });

  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    logger.warn('Registration failed: email already exists', { email });
    return res.status(400).json({ message: 'Email already used' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, passwordHash },
    select: { id: true, email: true, createdAt: true }
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  const hashedRefresh = hashRefreshToken(refreshToken);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: hashedRefresh },
  });

  logger.info('User registered successfully', { userId: user.id, email });

  res.cookie('refreshToken', refreshToken, refreshCookieOptions);
  return res.json({ accessToken, user: { id: user.id, email: user.email } });
}));

// Login endpoint - authenticates user and issues tokens
router.post('/login', validateLogin, asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  logger.info('Login attempt', { email });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    logger.warn('Login failed: user not found', { email });
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    logger.warn('Login failed: invalid password', { email });
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  const hashedRefresh = hashRefreshToken(refreshToken);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: hashedRefresh },
  });

  logger.info('User logged in successfully', { userId: user.id, email });

  res.cookie('refreshToken', refreshToken, refreshCookieOptions);
  return res.json({ accessToken, user: { id: user.id, email: user.email } });
}));

// Refresh endpoint - issues new access token if refresh token is valid
router.post('/refresh', asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    logger.warn('Refresh token attempt without token');
    return res.status(401).json({ message: 'No refresh token' });
  }

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch (err) {
    logger.warn('Invalid refresh token', { error: err.message });
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user || !user.refreshToken) {
    logger.warn('Refresh token attempt for non-existent user', { userId: payload.userId });
    return res.status(403).json({ message: 'Access denied' });
  }

  const hash = hashRefreshToken(token);
  if (hash !== user.refreshToken) {
    logger.warn('Refresh token mismatch', { userId: user.id });
    return res.status(403).json({ message: 'Token mismatch' });
  }

  const newAccessToken = generateAccessToken(user.id);
  const newRefreshToken = generateRefreshToken(user.id);
  const newHash = hashRefreshToken(newRefreshToken);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: newHash },
  });

  logger.info('Token refreshed successfully', { userId: user.id });

  res.cookie('refreshToken', newRefreshToken, refreshCookieOptions);
  return res.json({ accessToken: newAccessToken });
}));

// Logout endpoint - invalidates refresh token and clears cookie
router.post('/logout', asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    logger.info('Logout attempt without token');
    return res.sendStatus(204);
  }

  try {
    const payload = verifyRefreshToken(token);
    await prisma.user.update({
      where: { id: payload.userId },
      data: { refreshToken: null },
    });
    logger.info('User logged out successfully', { userId: payload.userId });
  } catch (_) {
    logger.info('Logout attempt with invalid token');
    // Invalid or expired token is fine; just clear the cookie.
  }

  res.clearCookie('refreshToken', { path: '/' });
  return res.sendStatus(204);
}));

export default router;