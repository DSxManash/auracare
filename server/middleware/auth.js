import { verifyAccessToken } from '../utils/token.js';
import logger from '../utils/logger.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.userId;
    next();
  } catch (err) {
    logger.warn('Invalid access token attempt', { error: err.message });
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
