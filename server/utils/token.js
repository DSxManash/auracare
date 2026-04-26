import jwt from 'jsonwebtoken';
import { config } from './config.js';

const {
  accessTokenSecret,
  refreshTokenSecret,
  accessTokenExpiry,
  refreshTokenExpiry,
} = config;


// Generate JWT access token
export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, accessTokenSecret, {
    expiresIn: accessTokenExpiry,
  });
};

//hashig refresh token for security
export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, refreshTokenSecret, {
    expiresIn: refreshTokenExpiry,
  });
};

// Hash refresh token using SHA-256
export const hashRefreshToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

// Verify JWT access token
export const verifyAccessToken = (token) =>
  jwt.verify(token, accessTokenSecret);

// Verify JWT refresh token
export const verifyRefreshToken = (token) =>
  jwt.verify(token, refreshTokenSecret);