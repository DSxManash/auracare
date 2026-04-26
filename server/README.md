# Auracare Server

A production-ready Node.js/Express API server with authentication, using Prisma ORM and PostgreSQL.

## Features

- 🔐 **JWT Authentication** with refresh token rotation
- 🛡️ **Security Headers** (Helmet, CORS, Rate Limiting)
- 📊 **Comprehensive Logging** (Winston + Morgan)
- ✅ **Input Validation** (express-validator)
- 🏥 **Health Checks** with database connectivity
- 🔄 **Graceful Shutdown** handling
- 📈 **Production Monitoring** ready
- 🚀 **PM2 Process Management** configuration

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
cd server
npm install
```

### Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/auracare"
ACCESS_TOKEN_SECRET="your-super-secret-access-token-key"
REFRESH_TOKEN_SECRET="your-super-secret-refresh-token-key"
ACCESS_TOKEN_EXPIRY="16m"
REFRESH_TOKEN_EXPIRY="7d"
REFRESH_TOKEN_EXPIRY_MS=604800000
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"
PORT=5000
LOG_LEVEL="info"
```

### Database Setup

```bash
# Generate Prisma client
npm run generate

# Run migrations
npm run migrate

# (Optional) Seed database
npm run db:seed
```

### Development

```bash
npm run dev
```

Server will start on `http://localhost:5000`

### Production

```bash
# Using PM2 (recommended)
npm run pm2:start

# Or using Node directly
npm run prod
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Health Checks

- `GET /` - Server info
- `GET /api/health` - Health check with database connectivity
- `GET /api/health/ready` - Readiness check for load balancers

## Security Features

- **Helmet**: Security headers
- **Rate Limiting**: 5 auth attempts per 15min, 100 general requests per 15min
- **CORS**: Configured for cross-origin requests
- **Input Validation**: Comprehensive validation on all inputs
- **Password Hashing**: bcrypt with 12 salt rounds
- **Token Security**: Refresh tokens hashed with SHA-256
- **Cookie Security**: httpOnly, secure, sameSite cookies

## Logging

Logs are stored in the `logs/` directory:
- `error.log` - Error level logs
- `combined.log` - All logs
- Console output in development

## PM2 Process Management

### Commands

```bash
# Start production server
npm run pm2:start

# View logs
npm run pm2:logs

# Restart server
npm run pm2:restart

# Stop server
npm run pm2:stop

# Delete process
npm run pm2:delete
```

### PM2 Features

- **Cluster Mode**: Utilizes all CPU cores
- **Auto Restart**: Automatic restart on crashes
- **Memory Limits**: Restart if memory usage exceeds 1GB
- **Log Rotation**: Automatic log management

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `ACCESS_TOKEN_SECRET` | JWT access token secret | Required |
| `REFRESH_TOKEN_SECRET` | JWT refresh token secret | Required |
| `ACCESS_TOKEN_EXPIRY` | Access token expiry time | `"16m"` |
| `REFRESH_TOKEN_EXPIRY` | Refresh token expiry time | `"7d"` |
| `REFRESH_TOKEN_EXPIRY_MS` | Refresh token expiry in milliseconds | `604800000` |
| `CLIENT_URL` | Frontend URL for CORS | Required |
| `NODE_ENV` | Environment mode | `"development"` |
| `PORT` | Server port | `5000` |
| `LOG_LEVEL` | Logging level | `"info"` |

## Project Structure

```
server/
├── index.js                 # Main application entry
├── ecosystem.config.js      # PM2 configuration
├── package.json
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── routes/
│   └── auth.js             # Authentication routes
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   ├── security.js         # Security headers & rate limiting
│   ├── validation.js       # Input validation
│   ├── error.js            # Error handling
│   └── health.js           # Health check endpoints
├── utils/
│   ├── config.js           # Environment configuration
│   ├── logger.js           # Winston logger setup
│   ├── prisma.js           # Prisma client instance
│   └── token.js            # JWT token utilities
├── logs/                   # Application logs (auto-created)
└── .env                    # Environment variables
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] SSL/TLS certificates (for production)
- [ ] Reverse proxy configured (nginx)
- [ ] Firewall rules set
- [ ] Monitoring/alerting configured
- [ ] Backup strategy implemented
- [ ] Log rotation configured

## Monitoring

The server includes health check endpoints that can be used with monitoring tools like:

- Kubernetes liveness/readiness probes
- Load balancer health checks
- Uptime monitoring services
- Application performance monitoring (APM)

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure all linting passes

## License

ISC