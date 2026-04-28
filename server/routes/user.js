import { Router } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../utils/prisma.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/error.js';
import logger from '../utils/logger.js';

const router = Router();

// Change password endpoint
router.post('/change-password', authenticate, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.userId;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current and new passwords are required' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ message: 'New password must be at least 8 characters long' });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const match = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!match) {
    logger.warn('Password change failed: current password mismatch', { userId });
    return res.status(400).json({ message: 'Current password is not accurate' });
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: newPasswordHash },
  });

  logger.info('Password changed successfully', { userId });
  res.json({ message: 'Password updated successfully' });
}));

// Update profile endpoint
router.post('/profile', authenticate, asyncHandler(async (req, res) => {
  const { name } = req.body;
  const userId = req.userId;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { name },
    select: { id: true, email: true, name: true }
  });

  logger.info('Profile updated successfully', { userId });
  res.json({ message: 'Profile updated successfully', user: updatedUser });
}));

export default router;
