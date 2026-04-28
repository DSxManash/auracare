# 🌿 AuraCare - Smart Plant Care System

## 🌐 Live Demo

🚀 <a href="https://auracare-weld.vercel.app/" target="_blank">Click here</a>

---

## ⚡ Quick Start

For a clean local setup, follow [SETUP.md](SETUP.md). It covers creating the PostgreSQL database, applying Prisma migrations to a fresh schema, seeding the current users, and starting both apps.

### Run Locally

**Terminal 1 - Backend Server:**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 - Frontend Dev Server:**
```bash
cd client
npm install
npm run dev
```

**Browser:**
- Open `http://localhost:5173`
- Login with `test@example.com` / `Test123456`

### Environment Files

- `server/.env.example` - copy this to `server/.env` and fill real values
- `client/.env.example` - optional, only needed if you want to override the Vite proxy
- Do not commit real secrets in `.env`

### Local Endpoints

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Database: PostgreSQL on `localhost:5432`

### Deploy Backend to Replit

1. Create a new Replit project and import this repo branch.
2. Set the backend working directory to `server`.
3. Add the Replit secrets from `server/.env.example`.
4. Run:
   ```bash
   npm install
   npm run generate
   npm run migrate:prod
   npm run db:seed
   npm start
   ```
5. Point the frontend API URL to the Replit backend URL if you deploy the client separately.

---

## 🧾 What’s in This Project

- Express API with auth, health, security, and validation middleware
- Prisma schema and migrations for PostgreSQL
- React + Vite frontend with auth, dashboard, and plant monitoring pages
- Session-based auth persistence and refresh token flow
- Seed script for current development users
- Local proxy-based API routing for development

---

## 📌 Project Overview

AuraCare is a full-stack web application that helps users manage plant care efficiently using weather-based logic.

Instead of fixed schedules, the system suggests plant care tasks (like watering) based on real-time environmental conditions such as temperature and humidity.

---

## 🎯 Objectives

* Automate plant care decisions
* Reduce plant damage due to improper care
* Provide a centralized dashboard for users
* Implement a simple rule-based intelligent system

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### API

* OpenWeather API (for temperature & humidity)

---

## 🔄 Basic Workflow

1. User logs into the system
2. User adds plant details
3. System fetches weather data
4. Rule-based logic calculates plant needs
5. Tasks are generated (watering, etc.)
6. User completes tasks
7. System stores history

---

## ✨ Features

* User Authentication (Login/Register)
* Add & manage plants
* Weather-based care suggestions
* Task management system
* Plant health status (Healthy / Warning / Urgent)

---

## 🚀 Getting Started

### Clone the repository:

```bash
git clone https://github.com/DSxManash/auracare.git
cd auracare
```

### Then follow:

- [SETUP.md](SETUP.md) for local database setup
- `server/.env.example` for server environment values
- `client/.env.example` if you want a custom client API URL

---

## 📌 Future Improvements

* Add AI-based recommendations
* Add notifications/reminders
* Improve UI/UX

---

## 📜 License

This project is for academic and learning purposes.
