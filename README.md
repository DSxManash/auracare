# 🌿 AuraCare - Smart Plant Care System

AuraCare is a modern, full-stack application designed to manage and monitor nursery environments. Featuring a sleek "Glass Oasis" aesthetic, it provides real-time insights into critical environmental metrics to ensure optimal plant health.

## 📌 Project Overview

Instead of relying on fixed schedules, AuraCare leverages real-time sensor data (simulated/integrated) to monitor conditions like temperature, humidity, light intensity, and soil moisture. The system provides actionable insights and automated task generation based on these metrics.

## ✨ Key Features

*   **Modern 'Glass Oasis' Interface:** A premium, responsive dashboard with a unified dark/light theme system and dynamic accents.
*   **Real-time Environmental Monitoring:** Dedicated modules for tracking Temperature, Humidity, Soil Moisture, Light Intensity, Nutrient levels, and pH.
*   **Intelligent Task Management:** System-generated care suggestions based on environmental thresholds.
*   **Role-Based Access Control:** Granular module-level permissions for different staff roles (Admin, Caretaker, Botanist).
*   **Secure Authentication:** Robust JWT-based authentication system.

## 🛠️ Tech Stack

### Frontend
*   **Framework:** React (Vite)
*   **Styling:** Tailwind CSS (Vanilla CSS for core design system)
*   **Icons:** Lucide React
*   **Animations:** Framer Motion

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** Supabase (PostgreSQL) integrated via Prisma ORM

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   A Supabase database instance

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/DSxManash/auracare.git
    cd auracare
    ```

2.  **Install dependencies:**
    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3.  **Environment Configuration:**
    *   Navigate to the `server` directory and copy the example env file: `cp .env.example .env`
    *   Update `.env` with your Supabase `DATABASE_URL` and generate strong JWT secrets.

4.  **Database Setup:**
    ```bash
    cd server
    npx prisma db push
    ```

5.  **Run the Application:**
    ```bash
    # Start the backend server (from /server)
    npm run dev

    # Start the frontend client (from /client)
    npm run dev
    ```

## 📜 License

This project is intended for academic and portfolio purposes.
