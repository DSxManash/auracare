# AuraCare Setup

Use this guide when cloning the repo on a new machine or when setting up AuraCare locally for the first time.

## What This Setup Does

- Creates the AuraCare PostgreSQL database
- Creates a PostgreSQL user if you want a dedicated local login
- Runs Prisma migrations on the fresh database
- Seeds the current development users

## Prerequisites

- Node.js 18+
- PostgreSQL installed and running locally
- npm installed

## 1. Create the Database and User

Open PostgreSQL as an admin user and create the database:

```sql
CREATE DATABASE auracare;
```

If you want a dedicated PostgreSQL login for AuraCare, create one and grant access:

```sql
CREATE USER auracare_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE auracare TO auracare_user;
ALTER USER auracare_user CREATEDB;
```

If you already have a PostgreSQL user, you can reuse it as long as it has access to `auracare`.

## 2. Configure the Server Environment

Copy [server/.env.example](server/.env.example) to [server/.env](server/.env) and update the values:

```env
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/auracare"
ACCESS_TOKEN_SECRET="your-super-secret-access-token-key"
REFRESH_TOKEN_SECRET="your-super-secret-refresh-token-key"
ACCESS_TOKEN_EXPIRY="16m"
REFRESH_TOKEN_EXPIRY="7d"
REFRESH_TOKEN_EXPIRY_MS=604800000
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

If you want to override the frontend API URL, copy [client/.env.example](client/.env.example) to [client/.env.local](client/.env.local) and set `VITE_API_URL`. For local development, leaving it empty uses the Vite proxy.

## 3. Install Dependencies

```bash
cd server
npm install
```

Then install the frontend dependencies too:

```bash
cd ../client
npm install
```

## 4. Generate Prisma Client

```bash
cd ../server
npm run generate
```

## 5. Run the Migration

Apply the Prisma migration to create the current schema:

```bash
npm run migrate
```

This creates the current database tables and indexes from the checked-in migration.

## 6. Seed the Database

Seed the database with the current development users:

```bash
npm run db:seed
```

Seeded users:

- `test@example.com` / `Test123456`
- `admin@auracare.com` / `Admin123456`
- `demo@auracare.com` / `Demo123456`

## 7. Start the App

Start the backend:

```bash
npm run dev
```

In another terminal, start the frontend:

```bash
cd ../client
npm run dev
```

Frontend URL: `http://localhost:5173`

## Fresh Start Reset

If you want to start over locally, you can drop and recreate the database, then rerun migrate and seed:

```sql
DROP DATABASE auracare;
CREATE DATABASE auracare;
```

Then run:

```bash
cd server
npm run generate
npm run migrate
npm run db:seed
```

## Troubleshooting

### P1010: User was denied access on the database

This means the user in `DATABASE_URL` cannot access the database, or the database name is wrong.

Check that:

- The database exists
- The username and password in `DATABASE_URL` are correct
- The user has privileges on the `auracare` database

### Access blocked or Forbidden in login/sign-up

Check that:

- `CLIENT_URL` matches the frontend origin exactly
- You are opening `http://localhost:5173`
- The server was restarted after editing `.env`

## Notes

- This guide is intended for new clones and first-time local setup
- The checked-in Prisma migration creates the current schema
- The seed command creates the current development users