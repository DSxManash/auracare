import dotenv from 'dotenv';

dotenv.config();

const getRequiredEnv = (key) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

if (!accessTokenSecret) {
  throw new Error('Missing required environment variable: ACCESS_TOKEN_SECRET or JWT_SECRET');
}

if (!refreshTokenSecret) {
  throw new Error('Missing required environment variable: REFRESH_TOKEN_SECRET');
}

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  clientUrl: getRequiredEnv('CLIENT_URL'),
  databaseUrl: getRequiredEnv('DATABASE_URL'),
  accessTokenSecret,
  refreshTokenSecret,
  accessTokenExpiry: getRequiredEnv('ACCESS_TOKEN_EXPIRY'),
  refreshTokenExpiry: getRequiredEnv('REFRESH_TOKEN_EXPIRY'),
  refreshTokenExpiryMs: Number(getRequiredEnv('REFRESH_TOKEN_EXPIRY_MS')),
};
